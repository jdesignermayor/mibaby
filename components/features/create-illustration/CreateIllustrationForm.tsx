'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";

export const IMAGE_SCHEMA = z
    .instanceof(File)
    .refine(
        (file) =>
            [
                "image/png",
                "image/jpeg",
                "image/jpg",
            ].includes(file.type),
        { message: "Invalid image file type" }
    );

const formSchema = z.object({
    customerId: z
        .string().nonempty("Customer id is required."),
    folderId: z
        .string().nonempty("Customer id is required."),
    description: z
        .string(),
    images: z.array(IMAGE_SCHEMA),
});

export default function CreateIllustrationForm() {
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customerId: "",
            folderId: "",
            description: "",
            images: [],
        },
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <FieldGroup className="flex flex-col gap-5">
                <Controller name="customerId" control={control} rules={{ required: true }}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-title">
                                Select customer
                            </FieldLabel>
                            <Select
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    aria-invalid={fieldState.invalid}
                                >
                                    <SelectValue placeholder="Select customer" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                    <SelectItem value="0">Item 1</SelectItem>
                                    <SelectItem value="1">Item 2</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button type="button">Create</Button>

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller name="folderId" control={control} rules={{ required: true }}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-title">
                                Select folder
                            </FieldLabel>
                            <Select
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    aria-invalid={fieldState.invalid}
                                >
                                    <SelectValue placeholder="Select customer" />

                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                    <SelectItem value="0">Item 1</SelectItem>
                                    <SelectItem value="1">Item 2</SelectItem>
                                </SelectContent>
                            </Select>

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller name="description" control={control} rules={{ required: true }}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-title">
                                Description
                            </FieldLabel>
                            <Textarea {...field} aria-invalid={fieldState.invalid} placeholder="I'm a software engineer..." />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )} />

                <Controller name="images" control={control} rules={{ required: true }}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-title">
                                Images
                            </FieldLabel>
                            <Input {...field} className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" aria-invalid={fieldState.invalid} type="file" multiple />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )} />
                <Button>Create</Button>
            </FieldGroup>
        </form>
    )
}