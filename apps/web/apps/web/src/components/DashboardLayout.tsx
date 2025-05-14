// src/components/DashboardLayout.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const goToProfile = () => {
    const role = localStorage.getItem("role");

    if (role === "medico") {
      router.push("/medico");
    } else if (role === "especialista") {
      router.push("/especialista");
    } else {
      router.push("/paciente");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col items-center">
        <div className="mb-6">
          <Image
            src="/REVAP.png"
            alt="Logo REVAP"
            width={120}
            height={120}
            className="mx-auto"
            priority
          />
          <h2 className="text-lg font-bold text-center mt-2 text-blue-700">REVAP</h2>
        </div>
        <nav className="w-full">
          <ul className="space-y-3">
            <li>
              <Link href="/dashboard">
                <span className="block px-4 py-2 rounded hover:bg-blue-100 cursor-pointer">
                  Inicio
                </span>
              </Link>
            </li>
            <li>
              <span
                onClick={goToProfile}
                className="block px-4 py-2 rounded hover:bg-blue-100 cursor-pointer"
              >
                Perfil
              </span>
            </li>
            <li>
              <Link href="/expedientes">
                <span className="block px-4 py-2 rounded hover:bg-blue-100 cursor-pointer">
                  Expedientes
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
