// src/pages/expedientes.tsx

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface DocumentoClinico {
  name: string;
  uploadedBy: "patient" | "doctor";
  uploadedAt: string;
}

export default function Expedientes() {
  const [documentos, setDocumentos] = useState<DocumentoClinico[]>([]);
  const [archivo, setArchivo] = useState<File | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("expedientes");
    if (stored) {
      setDocumentos(JSON.parse(stored));
    }
  }, []);

  const handleUpload = () => {
    if (!archivo) return;

    const nuevo: DocumentoClinico = {
      name: archivo.name,
      uploadedBy: localStorage.getItem("role") as "patient" | "doctor",
      uploadedAt: new Date().toLocaleString(),
    };

    const updated = [...documentos, nuevo];
    localStorage.setItem("expedientes", JSON.stringify(updated));
    setDocumentos(updated);
    setArchivo(null);
    alert("Documento subido exitosamente ✅");
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArchivo(file);
      console.log("Archivo seleccionado:", file.name);
    }
  };

  const handleShare = (doc: DocumentoClinico) => {
    const sharedWith = prompt("¿A qué correo deseas compartir el documento?");
    if (!sharedWith) return;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const shared = JSON.parse(localStorage.getItem("documents") || "[]");
    shared.push({ name: doc.name, code, sharedWith });
    localStorage.setItem("documents", JSON.stringify(shared));
    alert(`Documento compartido con ${sharedWith}. Código: ${code}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Mis Expedientes Clínicos</h2>

        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-lg font-semibold mb-2">Subir nuevo documento</h3>
          <Input
            type="file"
            accept="application/pdf"
            onChange={handleFileInput}
            className="mb-2"
          />
          <Button onClick={handleUpload} disabled={!archivo}>
            Subir documento
          </Button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Documentos Subidos</h3>
          {documentos.length === 0 ? (
            <p className="text-gray-500">No hay documentos cargados aún.</p>
          ) : (
            <ul className="space-y-2">
              {documentos.map((doc, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center border rounded p-2"
                >
                  <div>
                    📄 <strong>{doc.name}</strong> — Subido por: <em>{doc.uploadedBy}</em>
                    <div className="text-sm text-gray-500">{doc.uploadedAt}</div>
                  </div>
                  <Button
                    variant="outline"
                    className="ml-4"
                    onClick={() => handleShare(doc)}
                  >
                    Compartir
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
