// src/pages/dashboard.tsx

import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useState } from "react";
import withAuth from "@/components/withAuth";

function Dashboard() {
  const [role, setRole] = useState<"paciente" | "medico" | "especialista">("paciente");

  useEffect(() => {
    const storedRole = localStorage.getItem("role") as "paciente" | "medico" | "especialista";
    if (storedRole) setRole(storedRole);
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold mb-4">Bienvenido al Panel de Control</h2>
      {role === "medico" ? (
        <div className="space-y-4">
          <p className="text-gray-700">Accede a tu listado de pacientes, documentos y más.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">Pacientes asignados</div>
            <div className="bg-white p-4 rounded shadow">Documentos subidos</div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-700">Consulta y comparte tu expediente de forma segura.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">Mi expediente</div>
            <div className="bg-white p-4 rounded shadow">Permisos otorgados</div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default withAuth(Dashboard);
