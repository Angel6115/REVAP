// src/pages/medico.tsx

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { withAuth } from "@/components/withAuth";

function PerfilMedico() {
  const router = useRouter();
  const [editable, setEditable] = useState(false);
  const [perfil, setPerfil] = useState({
    nombre: "Dr. Paul Melone",
    especialidad: "Pediatría",
    colegiacion: "MP-123456",
    npi: "1234567891",
    telefono: "+1 234 567 8910",
    email: "paulmelone@gmail.com",
    direccion: "Calle Salud 123, Ponce",
    medicaid: "MEDI-99887766"
  });
  const rolActivo = "medico";

  useEffect(() => {
    const stored = localStorage.getItem("medicoProfile");
    if (stored) setPerfil(JSON.parse(stored));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const guardarCambios = () => {
    localStorage.setItem("medicoProfile", JSON.stringify(perfil));
    alert("Perfil actualizado ✅");
    setEditable(false);
  };

  const cerrarSesion = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-6 mb-6">
          <Image
            src="/doctor.png"
            alt="Avatar Médico"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold mb-1">Perfil del Médico</h2>
            <p className="text-sm text-gray-600">Estás logueado como: <strong>{rolActivo}</strong></p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(perfil).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium capitalize mb-1" htmlFor={key}>
                {key.replace(/_/g, " ")}
              </label>
              <Input
                name={key}
                value={value}
                onChange={handleChange}
                disabled={!editable}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            {editable ? (
              <>
                <Button onClick={guardarCambios}>Guardar</Button>
                <Button variant="outline" className="ml-2" onClick={() => setEditable(false)}>
                  Cancelar
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditable(true)}>Editar Perfil</Button>
            )}
          </div>
          <Button variant="destructive" onClick={cerrarSesion}>Cerrar sesión</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default withAuth(PerfilMedico);
