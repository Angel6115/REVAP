// src/components/Header.tsx

import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full py-4 flex justify-center bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <Image
          src="/REVAP.png"
          alt="Logo de REVAP"
          width={160} // Puedes ajustar esto si aún se ve pequeño
          height={80}
          priority
        />
      </div>
    </header>
  );
}
