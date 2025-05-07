// src/pages/paciente.tsx
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Paciente: React.FC = () => {
  // TODO: reemplaza esto con tu fetch real o props
  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Detalle del Paciente</h1>
        <p><strong>Nombre:</strong> Juan Pérez</p>
        <p><strong>Edad:</strong> 30 años</p>
        <p><strong>Servicio:</strong> Cardio</p>
        {/* Agrega aquí más campos según tu modelo */}
      </div>
    </DashboardLayout>
  );
};

export default Paciente;
