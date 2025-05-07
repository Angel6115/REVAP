// src/pages/index.tsx
import DashboardLayout from '@/components/DashboardLayout';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="bg-background min-h-screen p-8">
        <h1 className="font-heading text-primary text-4xl mb-4">
          ¡Tailwind funciona!
        </h1>
        <p className="font-body text-lg text-gray-700">
          Si ves este fondo color #F8F6F3 y el título en #0732EF, ¡estás listo!
        </p>
      </div>
    </DashboardLayout>
  );
}
