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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProfileSchema } from "@/models/profile.model";
import { profileAtomState } from "@/stores/features/profile.store";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

export default function ListProfilesTable({
  profiles,
  page,
  setPage,
  limit,
  setLimit,
  count,
  setSearch,
}: {
  profiles: ProfileSchema[];
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  count: number;
  setSearch: (search: string) => void;
}) {
  const totalPages = Math.ceil(count / limit);
  const router = useRouter();
  const [, setProfile] = useAtom(profileAtomState);

  const handleFilterByName = (name: string) => {
    setSearch(name);
  };

  const handleViewProfile = (profile: ProfileSchema) => {
    router.push(`/dashboard/profiles/${profile.uuid_profile}`);
    setProfile({ profile: profile, loading: false, error: null });
  };

  return (
    <div className="rounded-md border overflow-hidden">
      {/* Desktop Table View */}
      {/* filter by name */}
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Buscar por nombre"
          onChange={(e) => {
            handleFilterByName(e.target.value);
          }}
        />
      </div>

      <div className="hidden md:block overflow-x-auto">
        <Table className="w-full">
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
                  <TableCell width={"20%"}>{p.name}</TableCell>
                  <TableCell width={"20%"}>{p.age}</TableCell>
                  <TableCell width={"20%"}>{p.doc}</TableCell>
                  <TableCell width={"20%"}>{p.phone}</TableCell>
                  <TableCell width={"20%"}>
                    {new Date(p.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      className="cursor-pointer"
                      variant="outline"
                      onClick={() => handleViewProfile(p)}
                    >
                      Ver Perfil
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No hay resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        {profiles.length > 0 ? (
          <div className="divide-y">
            {profiles.map((p) => (
              <div key={p.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Edad: {p.age} años
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="cursor-pointer"
                    variant="outline"
                    onClick={() => handleViewProfile(p)}
                  >
                    Ver Perfil
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Documento:</span>
                    <p className="font-medium">{p.doc}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Teléfono:</span>
                    <p className="font-medium">{p.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Creado:</span>
                    <p className="font-medium">
                      {new Date(p.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">No hay resultados</div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t">
        {/* Selector de "items por página" */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Mostrar:
          </span>
          <Select
            value={String(limit)}
            onValueChange={(value: unknown) => setLimit(Number(value))}
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
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </Button>

          {/* Numeración de páginas - ocultar en móvil si hay muchas páginas */}
          <div className="hidden sm:flex items-center gap-1">
            {totalPages <= 7 ? (
              Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={`page-${pageNum}`}
                    variant={page === pageNum ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })
            ) : (
              <>
                {page > 2 && (
                  <>
                    <Button
                      key="page-1"
                      variant="ghost"
                      size="sm"
                      onClick={() => setPage(1)}
                    >
                      1
                    </Button>
                    {page > 3 && <span className="px-2">...</span>}
                  </>
                )}
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  const pageNum =
                    page <= 2
                      ? i + 1
                      : page >= totalPages - 1
                        ? totalPages - 2 + i
                        : page - 1 + i;
                  if (pageNum > totalPages) return null;
                  return (
                    <Button
                      key={`page-${pageNum}`}
                      variant={page === pageNum ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {page < totalPages - 1 && (
                  <>
                    {page < totalPages - 2 && <span className="px-2">...</span>}
                    <Button
                      key={`page-${totalPages}`}
                      variant="ghost"
                      size="sm"
                      onClick={() => setPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Indicador de página en móvil */}
          <span className="text-sm text-muted-foreground sm:hidden">
            {page} / {totalPages || 1}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
