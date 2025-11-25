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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export default function CreateCustomerDialog() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().nonempty("Name is required."),
        email: z.string().email("Invalid email."),
        age: z.number(),
        document: z.string().nonempty("Document is required."),
        phone: z.string().nonempty("Phone is required."),
      }),
    ),
    defaultValues: {
      name: "",
      email: "",
      age: 1,
      document: "",
      phone: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("data:", data);
  };
  
  return (
    <Dialog>
      {/* Botón que abre el popup */}
      <DialogTrigger asChild={true}>
        <Button>Crear nuevo cliente</Button>
      </DialogTrigger>

      {/* Contenido del popup */}
      <DialogContent className="sm:max-w-[425px] bg-white rounded-xl shadow-lg">
      <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Crear nuevo cliente</DialogTitle>
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
            {...register("document")}
          />
          <Input type="phone" placeholder="Teléfono" {...register("phone")} />
        

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button variant="outline" type="submit">Cancelar</Button>
          <Button>Guardar</Button>
        </DialogFooter>
      </form>
      </DialogContent>
    </Dialog>
  );
}
