// src/pages/verificar-expediente.tsx

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";

interface Documento {
  name: string;
  code: string;
  sharedWith: string;
}

export default function VerificarExpediente() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [docName, setDocName] = useState("");

  const handleVerify = () => {
    const stored = localStorage.getItem("documents");
    if (!stored) {
      setMessage("No hay documentos compartidos.");
      return;
    }

    const documents: Documento[] = JSON.parse(stored);

    const match = documents.find(
      (doc) => doc.sharedWith === email && doc.code === code
    );

    if (match) {
      setDocName(match.name);
      setAccessGranted(true);
      setMessage("");
    } else {
      setMessage("❌ Código o correo incorrecto. Acceso denegado.");
      setAccessGranted(false);
    }
  };

  const simulateShare = () => {
    const existing: Documento[] = JSON.parse(localStorage.getItem("documents") || "[]");
    existing.push({
      name: "Expediente Clínico - Juan Pérez",
      code: "794264",
      sharedWith: "pediatra@clinic.org",
    });
    localStorage.setItem("documents", JSON.stringify(existing));
    alert("Documento simulado como compartido.");
  };

  return (
    <DashboardLayout>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Verificar Acceso a Expediente</h2>

        <Input
          placeholder="Correo electrónico del destinatario"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Código de acceso"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-2"
        />

        <Button className="w-full mt-4" onClick={handleVerify}>
          Verificar Acceso
        </Button>

        <Button
          variant="outline"
          className="w-full mt-2"
          onClick={simulateShare}
        >
          Simular Compartir Documento
        </Button>

        {message && (
          <div className="mt-4 p-2 border border-red-500 text-red-600 rounded">
            {message}
          </div>
        )}

        {accessGranted && (
          <div className="mt-4 p-4 bg-green-50 border border-green-400 rounded text-green-700">
            ✅ Acceso concedido al documento: <strong>{docName}</strong>
            <div className="mt-2">
              <Button variant="outline">Ver documento</Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
