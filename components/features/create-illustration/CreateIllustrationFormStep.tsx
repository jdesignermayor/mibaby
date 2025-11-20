"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCompany } from "@/hooks/use-company";
import type {
  Illustration,
  ImageFormat,
  ImageUploaded,
} from "@/models/illustration.model";
import { uiSettingsAtomState } from "@/stores/shared/ui-settings-store";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/ui-components/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { PlusIcon, SparkleIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import CreateCustomerDialog from "../create-profile/CreateProfileForm";

import { createIllustration } from "@/actions/illustration";
import { Spinner } from "@/components/ui/spinner";
import { createIllustrationAtomState } from "@/stores/shared/create-illustration.store";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const BUCKET_NAME = "unprocessed_images";

const imageSchema = z.object({
  name: z.string(),
  base64: z.string().optional(),
  path: z.string().optional(),
  isUploaded: z.boolean().optional(),
});

const formSchema = z.object({
  customerId: z.string().nonempty("Customer id is required."),
  description: z.string(),
  gestationalWeek: z.string(),
  images: z
    .array(imageSchema)
    .min(1, { message: "At least one image is required." }),
});

type FormSchema = z.infer<typeof formSchema>;

export const GESTATIONAL_WEEKS = Array.from({ length: 7 }, (_, i) => ({
  name: `Semana ${26 + i}`,
  numero: 26 + i,
}));

export default function CreateIllustrationForm() {
  const router = useRouter();
  const { data: profiles } = useCompany();
  const [, setUISettings] = useAtom(uiSettingsAtomState);
  const [, setCreateIllustration] = useAtom(createIllustrationAtomState);
  const [isLoading, setIsLoading] = useState(false);
  const [base64Images, setBase64Images] = useState<ImageFormat[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
      gestationalWeek: "",
      description: "",
      images: [],
    },
  });

  const onSubmit = async (formValues: FormSchema) => {
    const formData = new FormData();
    formData.append("customerId", formValues.customerId);
    formData.append("description", formValues.description);
    formData.append("gestationalWeek", formValues.gestationalWeek);
    formData.append("images", JSON.stringify(formValues.images));

    try {
      setIsLoading(true);
      const result = await createIllustration(formData);

      setIsLoading(false);

      setUISettings((prev) => ({
        ...prev,
        stepper: {
          ...prev.stepper,
          currentStep: prev.stepper.currentStep + 1,
        },
      }));

      const illustration: Illustration = {
        id: result.id,
        userId: result.user_id,
        profileId: result.profile_id,
        description: result.description,
        gestationalWeek: result.gestational_week,
        avatarPictureUrl: result.avatar_picture_url,
        images: result.images,
        createdAt: new Date().toISOString(),
      };

      setCreateIllustration(illustration);
      router.push(`/dashboard/create-illustration/${result.id}`);
      toast.success("Illustration loaded successfully");
    } catch (error) {
      toast.error("Error creating illustration", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = async (index: number) => {
    const currentImages = getValues("images");

    // supabase delete image
    const { path } = currentImages[index];

    if (!path) {
      toast.error("Path is required");
      return;
    }

    try {
      await supabase.storage.from(BUCKET_NAME).remove([path]);
      const updatedImages = currentImages.filter((_, i) => i !== index);
      setValue("images", updatedImages);
      toast.success("Image removed");
    } catch (error) {
      toast.error("Error removing image");
    }
  };

  const processFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    // copia local que podemos usar inmediatamente
    let updatedImages = [...base64Images];

    for (const file of Array.from(files)) {
      if (!file.name.match(/\.(jpg|png)$/i)) {
        toast.error("Only JPG and PNG files are allowed", {
          position: "top-center",
        });
        continue;
      }

      if (file.size > 1 * 1024 * 1024) {
        toast.error("File size must be less than 1MB");
        continue;
      }

      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const image: ImageFormat = {
        name: file.name,
        base64,
        isUploaded: false,
      };

      updatedImages = [...updatedImages, image];

      setBase64Images(updatedImages);

      startTransition(async () => {
        const { path } = await uploadImageToBucket(base64);

        updatedImages = updatedImages.map((img) =>
          img.name === file.name ? { ...img, path, isUploaded: true } : img,
        );

        setBase64Images(updatedImages);

        const cleanedForForm = updatedImages.map((img) => ({
          ...img,
          base64: "",
        }));

        // 7. Actualizamos el formulario
        setValue("images", cleanedForForm, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      });
    }
  };

  const uploadImageToBucket = async (image: string): Promise<ImageUploaded> => {
    const base64WithoutPrefix = image.split("base64,")[1];
    const filePath = `public/${Date.now()}-${Math.random().toString(36).substring(2, 15)}_UNPROCESSED.jpg`;

    const imagesUploaded = await supabase.storage
      .from("unprocessed_images")
      .upload(filePath, Buffer.from(base64WithoutPrefix, "base64"), {
        contentType: "image/jpg",
        upsert: false,
      });

    if (imagesUploaded.error) {
      toast.error("Error uploading image to bucket");
    }
    toast.success("Image uploaded to bucket");

    return imagesUploaded.data as ImageUploaded;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      processFiles(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files) {
      processFiles(files);
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById("images") as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className="grid"
    >
      <FieldGroup className="flex flex-col gap-5">
        <Controller
          name="images"
          control={control}
          rules={{ required: true }}
          render={({ fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Images</FieldLabel>
              <Input
                id="images"
                className="hidden"
                aria-invalid={fieldState.invalid}
                type="file"
                multiple={true}
                accept="image/*"
                onChange={handleFileChange}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {base64Images.length === 0 && (
          <button
            type="button"
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            aria-label="Subir imágenes haciendo clic o arrastrando y soltando"
            className={`relative w-full cursor-pointer transition-colors duration-200 border-2 border-dashed rounded-xl p-3 hover:bg-muted/50 border-muted-foreground/25 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              isDragging ? "bg-muted/70 border-primary" : ""
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="p-5 rounded-full bg-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-upload size-8 text-muted-foreground"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" x2="12" y1="3" y2="15"></line>
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {isDragging ? "Soltar aquí" : "Subir imágenes"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {isDragging
                    ? "Suelta los archivos para subirlos"
                    : "Arrastra y suelta o haz clic para seleccionar"}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Formatos: JPG, PNG, GIF, WebP • Máximo 5 imágenes • Máximo 4MB
                  por imagen
                </p>
              </div>
            </div>
          </button>
        )}

        {base64Images.length > 0 && (
          <div className="flex flex-wrap gap-2 overflow-hidden">
            {base64Images.map((img, index) => {
              return (
                <div
                  key={String(index)}
                  className={`flex flex-col gap-2 relative ${!img.isUploaded && "opacity-50"}`}
                >
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => {
                      const filteredImages = base64Images.filter(
                        (_, i) => i !== index,
                      );
                      setBase64Images(filteredImages);
                      removeImage(index);
                    }}
                    className=" top-0 right-0 p-2 absolute text-white"
                  >
                    <TrashIcon />
                  </Button>
                  <Image
                    key={Math.floor(Math.random() * 50)}
                    src={img.base64}
                    alt="image"
                    width={300}
                    height={300}
                    className=" w-30 h-30 rounded-md object-cover border"
                  />
                </div>
              );
            })}
            <Button
              type="button"
              variant="ghost"
              onClick={handleClick}
              className=" cursor-pointer w-30 h-30 rounded-md flex items-center justify-center outline-1 -outline-offset-1 outline-gray-900/20 outline-dashed dark:outline-white/20"
            >
              <PlusIcon />
            </Button>
          </div>
        )}

        <div className="flex gap-2">
          <div>
            <Controller
              name="customerId"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-title"
                    className="flex justify-between items-center"
                  >
                    <div>Selecciona el cliente</div>
                  </FieldLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {profiles.map((profile) => (
                        <SelectItem key={profile.id} value={String(profile.id)}>
                          {profile.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div>
            <Controller
              name="gestationalWeek"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2 justify-between ">
                  <div className="text-sm font-medium">Semana gestacional</div>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gestational week" />
                    </SelectTrigger>

                    <SelectContent>
                      {GESTATIONAL_WEEKS.map((week) => (
                        <SelectItem
                          key={week.numero}
                          value={String(week.numero)}
                        >
                          {week.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>
        </div>
        <div>
          <CreateCustomerDialog />
        </div>

        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">
                Descripción (opcional)
              </FieldLabel>
              <Textarea
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Especifica aqui detalles a tener en cuenta para la generación de la ecografía hiperrealista."
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          size="lg"
          className="w-full h-12 text-lg cursor-pointer"
          disabled={!isValid && !isLoading && !isPending}
        >
          {isLoading ? <Spinner className="size-4" /> : <SparkleIcon />}
          Generar ecografias realistas
        </Button>
      </FieldGroup>
    </form>
  );
}
