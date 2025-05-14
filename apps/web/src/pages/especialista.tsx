// src/pages/especialista.tsx

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/router";

export default function PerfilEspecialista() {
  const router = useRouter();
  const [editando, setEditando] = useState(false);
  const [datos, setDatos] = useState({
    nombre: "Lic. Camila Rodríguez",
    profesion: "Terapista del Habla y Lenguaje",
    licencia_profesional: "LIC-789456",
    fecha_caducidad: "2026-12-31",
    npi: "9876543210",
    medicaid: "MED-55443322",
    email: "camila@clinic.org",
    telefono: "+1 787-000-1122",
    direccion: "Calle Luna 45, Bayamón",
  });
  const [rolActivo, setRolActivo] = useState("especialista");

  useEffect(() => {
    const saved = localStorage.getItem("perfilEspecialista");
    if (saved) setDatos(JSON.parse(saved));
    const role = localStorage.getItem("role")?.toLowerCase();
    setRolActivo(role === "medico" || role === "especialista" || role === "paciente" ? role : "especialista");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const guardarCambios = () => {
    localStorage.setItem("perfilEspecialista", JSON.stringify(datos));
    alert("Perfil actualizado ✅");
    setEditando(false);
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
            <h2 className="text-2xl font-bold mb-1">Perfil del Especialista</h2>
            <p className="text-sm text-gray-600">Estás logueado como: <strong>{rolActivo}</strong></p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(datos).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium capitalize mb-1" htmlFor={key}>
                {key.replace(/_/g, " ")}
              </label>
              <Input
                name={key}
                value={value}
                onChange={handleChange}
                disabled={!editando}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            {editando ? (
              <>
                <Button onClick={guardarCambios}>Guardar</Button>
                <Button variant="outline" className="ml-2" onClick={() => setEditando(false)}>
                  Cancelar
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditando(true)}>Editar Perfil</Button>
            )}
          </div>
          <Button variant="destructive" onClick={cerrarSesion}>Cerrar sesión</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
