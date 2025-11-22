"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCompany } from "@/hooks/use-company";
import { BabyIcon } from "lucide-react";
import { Profile } from "@/models/profile.model";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ListProfilesTable({ profiles, total, page, setPage, limit, setLimit }: { profiles: Profile[], total: number, page: number, setPage: (page: number) => void, limit: number, setLimit: (limit: number) => void }) {
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleLimitChange = (limit: number) => {
    setLimit(limit);
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Edad</TableHead>
            <TableHead>Documento</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Creado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {profiles.length > 0 ? (
            profiles.map((p) => (
              <TableRow key={p.id}>
                {/* Name */}
                <TableCell>{p.name}</TableCell>

                {/* Age */}
                <TableCell>{p.age}</TableCell>

                {/* Document */}
                <TableCell>{p.doc}</TableCell>

                {/* Phone */}
                <TableCell>{p.phone}</TableCell>

                {/* CreatedAt */}
                <TableCell>
                  {new Date(p.createdAt).toLocaleDateString()}
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => console.log("Perfil:", p)}
                  >
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No hay resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between p-2">

        {/* Selector de "items por página" */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Mostrar:</span>
          <Select
            value={String(limit)}
            onValueChange={(value : unknown) => setLimit(Number(value))}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Paginación */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </Button>

          {/* Numeración de páginas */}
          {Array.from({ length: total }, (_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "ghost"}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            disabled={page === total}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}