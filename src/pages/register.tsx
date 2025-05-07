// src/pages/register.tsx

import { useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";

export default function Register() {
  const router = useRouter();
  const [role, setRole] = useState<string>("paciente");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("role", role);
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-6">
          <h1 className="text-2xl font-bold text-center">Registro en REVAP</h1>

          <div className="flex justify-center gap-4">
            <Button
              variant={role === "paciente" ? "default" : "outline"}
              onClick={() => setRole("paciente")}
            >
              Paciente
            </Button>
            <Button
              variant={role === "medico" ? "default" : "outline"}
              onClick={() => setRole("medico")}
            >
              Médico
            </Button>
            <Button
              variant={role === "especialista" ? "default" : "outline"}
              onClick={() => setRole("especialista")}
            >
              Especialista
            </Button>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            <Input
              placeholder="Correo electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button className="w-full" type="submit">
              Registrarse
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
