// src/pages/paciente.tsx

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/router";

export default function PerfilPaciente() {
  const router = useRouter();
  const [editable, setEditable] = useState(false);
  const [perfil, setPerfil] = useState({
    nombre: "LOIS SANS",
    edad: "4",
    contacto: "+1 000 000 0000",
    ciudad: "Ponce",
  });
  const [rolActivo, setRolActivo] = useState("paciente");

  useEffect(() => {
    const stored = localStorage.getItem("pacienteProfile");
    if (stored) {
      setPerfil(JSON.parse(stored));
    }
    const role = localStorage.getItem("role")?.toLowerCase();
    setRolActivo(role === "medico" || role === "especialista" || role === "paciente" ? role : "paciente");
  }, []);

  const handleChange = (field: string, value: string) => {
    setPerfil((prev) => ({ ...prev, [field]: value }));
  };

  const guardarPerfil = () => {
    localStorage.setItem("pacienteProfile", JSON.stringify(perfil));
    setEditable(false);
    alert("Perfil guardado ✅");
  };

  const cerrarSesion = () => {
    localStorage.clear();
    router.push("/login");
  };

  const avatar = rolActivo === "medico" ? "/doctor.png" : rolActivo === "especialista" ? "/especialista.png" : "/avatar-placeholder.png";

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-6">
          <Image
            src={avatar}
            alt="Foto Paciente"
            width={120}
            height={120}
            className="rounded-full mx-auto"
          />
          <h2 className="text-2xl font-bold mt-2">Perfil del Paciente</h2>
          <p className="text-sm text-gray-600">Estás logueado como: <strong>{rolActivo}</strong></p>
        </div>

        <div className="space-y-4">
          <Input
            value={perfil.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            disabled={!editable}
            placeholder="Nombre completo"
          />
          <Input
            value={perfil.edad}
            onChange={(e) => handleChange("edad", e.target.value)}
            disabled={!editable}
            placeholder="Edad"
          />
          <Input
            value={perfil.contacto}
            onChange={(e) => handleChange("contacto", e.target.value)}
            disabled={!editable}
            placeholder="Contacto"
          />
          <Input
            value={perfil.ciudad}
            onChange={(e) => handleChange("ciudad", e.target.value)}
            disabled={!editable}
            placeholder="Ciudad"
          />

          <div className="flex justify-center space-x-4 pt-4">
            {editable ? (
              <>
                <Button onClick={guardarPerfil}>Guardar</Button>
                <Button variant="outline" onClick={() => setEditable(false)}>
                  Cancelar
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditable(true)}>Editar Perfil</Button>
            )}
            <Button variant="destructive" onClick={cerrarSesion}>Cerrar sesión</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
