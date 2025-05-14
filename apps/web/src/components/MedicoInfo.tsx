import React from 'react'
import Image from 'next/image'
import { Button } from './ui/Button'

export default function MedicoInfo() {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
      <div className="flex items-center gap-6">
        <Image
          src="/doctor-placeholder.jpg"
          alt="Foto del médico"
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Paul Melone H.</h2>
          <p className="text-gray-700">Departamento de Pediatría</p>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>NPI:</strong> 12345678911</p>
            <p><strong>Correo:</strong> paulmelone@gmail.com</p>
            <p><strong>Teléfono:</strong> +56 0000 00000</p>
            <p><strong>Oficina:</strong> 15A</p>
            <p><strong>Especialidad:</strong> Pediatría</p>
          </div>
        </div>
      </div>

      {/* Botón para editar información */}
      <div className="self-end md:self-auto">
        <Button variant="default">Editar Información</Button>
      </div>
    </div>
  )
}
