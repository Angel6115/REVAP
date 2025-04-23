// src/pages/medico.tsx

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/router";

interface InfoMedico {
  nombre: string;
  especialidad: string;
  npi: string;
  colegiacion: string;
  contacto: string;
  email: string;
  direccion: string;
}

export default function PerfilMedico() {
  const router = useRouter();
  const [editando, setEditando] = useState(false);
  const [datos, setDatos] = useState<InfoMedico>({
    nombre: "Dr. Paul Melone H.",
    especialidad: "Pediatría",
    npi: "1234567891",
    colegiacion: "OFICINA 15A",
    contacto: "+56 000 00000",
    email: "paulmelone@gmail.com",
    direccion: "Av. Siempre Viva 123, Piso 2",
  });
  const [rolActivo, setRolActivo] = useState("medico");

  useEffect(() => {
    const stored = localStorage.getItem("perfilMedico");
    if (stored) setDatos(JSON.parse(stored));
    const role = localStorage.getItem("role")?.toLowerCase();
    setRolActivo(role === "medico" || role === "especialista" || role === "paciente" ? role : "medico");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const guardarCambios = () => {
    localStorage.setItem("perfilMedico", JSON.stringify(datos));
    setEditando(false);
    alert("Perfil actualizado ✅");
  };

  const cerrarSesion = () => {
    localStorage.clear();
    router.push("/login");
  };

  const avatar = rolActivo === "medico" ? "/doctor.png" : rolActivo === "especialista" ? "/especialista.png" : "/avatar-placeholder.png";

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-6 mb-6">
          <Image
            src={avatar}
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold mb-1">Perfil del Médico</h2>
            <p className="text-sm text-gray-600">Estás logueado como: <strong>{rolActivo}</strong></p>
          </div>
        </div>

        <div className="bg-white rounded shadow p-4 space-y-4">
          {Object.entries(datos).map(([key, value]) => (
            <div key={key}>
              <label className="block font-semibold capitalize mb-1" htmlFor={key}>
                {key}
              </label>
              <Input
                name={key}
                value={value}
                onChange={handleChange}
                disabled={!editando}
              />
            </div>
          ))}

          <div className="pt-4 flex justify-between items-center">
            {editando ? (
              <>
                <Button onClick={guardarCambios}>Guardar</Button>
                <Button variant="outline" onClick={() => setEditando(false)} className="ml-2">
                  Cancelar
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditando(true)}>Editar Información</Button>
            )}
            <Button variant="destructive" onClick={cerrarSesion}>Cerrar sesión</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}