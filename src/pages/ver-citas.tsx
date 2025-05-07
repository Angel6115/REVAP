// src/pages/ver-citas.tsx

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export default function VerCitas() {
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const [reschedIndex, setReschedIndex] = useState<number | null>(null);
  const [nuevaFecha, setNuevaFecha] = useState<string>("");
  const [nuevaHora, setNuevaHora] = useState<string>("");

  // Load on mount and listen to storage changes
  useEffect(() => {
    const cargarSolicitudes = () => {
      const stored = JSON.parse(localStorage.getItem("solicitudesDeCita") || "[]");
      setSolicitudes(stored);
    };
    cargarSolicitudes();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "solicitudesDeCita") cargarSolicitudes();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const actualizarSolicitudes = (nuevas: any[]) => {
    setSolicitudes(nuevas);
    localStorage.setItem("solicitudesDeCita", JSON.stringify(nuevas));

    const citasPaciente = JSON.parse(localStorage.getItem("pacienteCitas") || "[]");
    const actualizadas = citasPaciente.map((cita: any) => {
      const match = nuevas.find((s: any) =>
        s.profesional === cita.profesional &&
        s.razon === cita.razon &&
        s.lugar === cita.lugar
      );
      return match ? { ...cita, ...match } : cita;
    });
    localStorage.setItem("pacienteCitas", JSON.stringify(actualizadas));
  };

  const confirmar = (i: number) => {
    const actualizadas = [...solicitudes];
    actualizadas[i].confirmadaPorEspecialista = true;
    actualizadas[i].estado = "aceptada";
    actualizarSolicitudes(actualizadas);
  };

  const rechazar = (i: number) => {
    const actualizadas = [...solicitudes];
    actualizadas[i].estado = "rechazada";
    actualizarSolicitudes(actualizadas);
  };

  const seleccionarNuevaFecha = (i: number) => {
    setReschedIndex(i);
    setNuevaFecha(solicitudes[i].fecha || "");
    setNuevaHora(solicitudes[i].hora || "");
  };

  const guardarNuevaFecha = () => {
    if (reschedIndex === null) return;
    const actualizadas = [...solicitudes];
    actualizadas[reschedIndex].fecha = nuevaFecha;
    actualizadas[reschedIndex].hora = nuevaHora;
    actualizadas[reschedIndex].estado = "propuesta";
    actualizarSolicitudes(actualizadas);
    setReschedIndex(null);
  };

  const eliminar = (i: number) => {
    const restantes = solicitudes.filter((_, idx) => idx !== i);
    actualizarSolicitudes(restantes);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6">Solicitudes de Citas</h2>
        {solicitudes.length === 0 ? (
          <p className="text-gray-500">No hay solicitudes.</p>
        ) : (
          <div className="space-y-4">
            {solicitudes.map((s, i) => (
              <div
                key={i}
                className="relative border p-4 rounded shadow bg-white"
              >
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => eliminar(i)}
                  aria-label="Eliminar"
                >
                  <X size={18} />
                </button>
                <p className="font-semibold text-lg">
                  {s.fecha} — {s.hora}
                </p>
                <p><strong>Paciente:</strong> {s.paciente || "Nombre no disponible"}</p>
                <p><strong>Profesional:</strong> {s.profesional}</p>
                <p><strong>Especialidad:</strong> {s.especialidad}</p>
                <p><strong>Lugar:</strong> {s.lugar}</p>
                <p><strong>Razón:</strong> {s.razon}</p>
                <p><strong>Estado:</strong> {s.estado || "pendiente"}</p>
                <div className="flex gap-3 mt-3">
                  <Button onClick={() => confirmar(i)}>Aceptar</Button>
                  <Button variant="destructive" onClick={() => rechazar(i)}>Rechazar</Button>
                  <Button variant="outline" onClick={() => seleccionarNuevaFecha(i)}>Seleccionar nueva fecha</Button>
                </div>

                {reschedIndex === i && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      value={nuevaFecha}
                      onChange={(e) => setNuevaFecha(e.target.value)}
                    />
                    <Input
                      type="time"
                      value={nuevaHora}
                      onChange={(e) => setNuevaHora(e.target.value)}
                    />
                    <Button className="col-span-2" onClick={guardarNuevaFecha}>
                      Guardar nueva fecha
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
