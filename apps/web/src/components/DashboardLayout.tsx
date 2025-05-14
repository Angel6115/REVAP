// apps/web/src/components/DashboardLayout.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar lateral */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col items-center">
        <div className="mb-6">
          <Image
            src="/revap.png"
            alt="Logo REVAP"
            width={120}
            height={120}
            priority
          />
        </div>
        <nav className="w-full">
          <ul className="space-y-3">
            <li>
              <Link href="/dashboard" className="block px-4 py-2 rounded hover:bg-accent1 text-primary font-medium">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/paciente" className="block px-4 py-2 rounded hover:bg-accent1 text-primary font-medium">
                Perfil
              </Link>
            </li>
            <li>
              <Link href="/expedientes" className="block px-4 py-2 rounded hover:bg-accent1 text-primary font-medium">
                Expedientes
              </Link>
            </li>
            <li>
              <Link href="/crear-referido" className="block px-4 py-2 rounded hover:bg-accent1 text-primary font-medium">
                Crear Referido
              </Link>
            </li>
            <li>
              <Link href="/ver-referidos" className="block px-4 py-2 rounded hover:bg-accent1 text-primary font-medium">
                Ver Referidos
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Área principal */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}