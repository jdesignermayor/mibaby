import { createProfile } from "@/app/actions/profiles";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { ProfileSchema } from "@/models/profile.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function CreateCustomerDialog() {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().nonempty("Name is required."),
        email: z.string().email("Invalid email."),
        age: z.number(),
        doc: z.string().nonempty("Document is required."),
        phone: z.string().nonempty("Phone is required."),
      }),
    ),
    defaultValues: {
      name: "",
      email: "",
      age: 1,
      doc: "",
      phone: "",
    },
  });

  const onSubmit = async (data: z.infer<ProfileSchema>) => {
    try {
      const result = await createProfile(
        data as Omit<ProfileSchema, "id" | "created_at">,
      );

      toast.success("Perfil creado correctamente");
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Botón que abre el popup */}
      <DialogTrigger asChild={true}>
        <Button>Crear perfil de cliente</Button>
      </DialogTrigger>

      {/* Contenido del popup */}
      <DialogContent className="sm:max-w-[425px] bg-white rounded-xl shadow-lg">
        <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Crear perfil de cliente</DialogTitle>
            <DialogDescription>
              Completa la información y guarda los cambios.
            </DialogDescription>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Nombre del cliente"
            className="w-full border rounded-md p-2"
            {...register("name")}
          />
          <Input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border rounded-md p-2"
            {...register("email")}
          />
          <Input
            type="number"
            placeholder="Documento de identidad"
            {...register("doc")}
          />
          <Input type="phone" placeholder="Teléfono" {...register("phone")} />

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <DialogClose asChild={true}>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
