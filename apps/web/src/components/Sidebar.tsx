import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#04345C] text-white min-h-screen p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Image src="/REVAP.png" alt="Logo" width={140} height={40} />
      </div>

      <nav className="flex-1 space-y-4 text-sm">
        <Link href="/dashboard" className="block hover:text-blue-300">🏠 Dashboard</Link>
        <Link href="/crear-referido" className="block hover:text-blue-300">➕ Crear Referido</Link>
        <Link href="/ver-referidos" className="block hover:text-blue-300">📋 Ver Referidos</Link>
        <Link href="/ver-citas" className="block hover:text-blue-300">📅 Citas</Link>
        <Link href="/informes" className="block hover:text-blue-300">📊 Informes</Link>
      </nav>

      <div className="mt-6 space-y-2 text-sm">
        <Link href="/configuracion" className="block hover:text-blue-300">⚙️ Configuración</Link>
        <Link href="/login" className="block hover:text-blue-300">🚪 Cerrar Sesión</Link>
      </div>
    </aside>
  );
}
