import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '@/lib/supabaseClient';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import Image from 'next/image';

interface Referido {
  id: string;
  nombre?: string;
  edad?: string;
  especialista?: string;
  servicio?: string;
  cpt?: string;
  tipo?: string;
  fecha?: string;
  estado?: string;
}

export default function VerReferidos() {
  const router = useRouter();
  const { id } = router.query;
  const [referido, setReferido] = useState<Referido | null>(null);
  const [servicios, setServicios] = useState<string[]>([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [recomendacionIA, setRecomendacionIA] = useState('');

  useEffect(() => {
    if (id) cargarReferido();
    cargarServicios();
  }, [id]);

  const cargarReferido = async () => {
    try {
      const { data, error } = await supabase
        .from('vista_duplicados_filtrable')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setReferido(data);
    } catch (error) {
      console.error('Error al cargar referido:', error);
    }
  };

  const cargarServicios = async () => {
    try {
      const { data, error } = await supabase
        .from('vista_duplicados_filtrable')
        .select('servicio', { distinct: true });

      if (error) throw error;
      const serviciosUnicos = [...new Set(data.map((item: any) => item.servicio))];
      setServicios(serviciosUnicos);
    } catch (error) {
      console.error('Error al cargar servicios:', error);
    }
  };

  const generarRecomendacionIA = async () => {
    if (!servicioSeleccionado) return;
    try {
      const response = await fetch('/api/ia-recomendacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ servicio: servicioSeleccionado }),
      });

      const resultado = await response.json();
      setRecomendacionIA(resultado.recomendacion || 'No disponible');
    } catch (error) {
      console.error('Error IA:', error);
    }
  };

  const generarPDF = async () => {
    const doc = new jsPDF();
    const qrData = `${window.location.origin}/ver-referidos?id=${referido?.id}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const logo = new Image();
    logo.src = '/revaplogo.png';

    logo.onload = () => {
      doc.addImage(logo, 'PNG', 10, 10, 40, 20);
      doc.addImage(qrCode, 'PNG', 150, 10, 40, 40);

      doc.setFontSize(12);
      doc.text(`Nombre: ${referido?.nombre || 'No disponible'}`, 10, 60);
      doc.text(`Edad: ${referido?.edad || 'No disponible'}`, 10, 70);
      doc.text(`Servicio: ${referido?.servicio || 'No disponible'}`, 10, 80);
      doc.text(`CPT: ${referido?.cpt || 'No disponible'}`, 10, 90);
      doc.text(`Fecha: ${referido?.fecha || 'No disponible'}`, 10, 100);
      doc.text(`Estado: ${referido?.estado || 'No disponible'}`, 10, 110);

      doc.save(`referido_${referido?.id || 'sin_id'}.pdf`);
    };
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h3 style={{ fontWeight: 'bold', color: '#003087' }}>Detalles del Referido</h3>
      <p><strong>Nombre:</strong> {referido?.nombre || 'No disponible'}</p>
      <p><strong>Edad:</strong> {referido?.edad || 'No disponible'}</p>
      <p><strong>Especialista:</strong> {referido?.especialista || 'No disponible'}</p>
      <p><strong>Servicio:</strong> {referido?.servicio || 'No disponible'}</p>
      <p><strong>CPT:</strong> {referido?.cpt || 'No disponible'}</p>
      <p><strong>Tipo:</strong> {referido?.tipo || 'No disponible'}</p>
      <p><strong>Fecha:</strong> {referido?.fecha || 'No disponible'}</p>
      <p><strong>Estado:</strong> {referido?.estado || 'No disponible'}</p>

      <hr />

      <div>
        <h4 style={{ marginTop: '2rem', color: '#003087' }}>Recomendación Inteligente</h4>
        <select
          value={servicioSeleccionado}
          onChange={(e) => setServicioSeleccionado(e.target.value)}
          style={{ marginRight: '1rem' }}
        >
          <option value="">-- Selecciona un servicio --</option>
          {servicios.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>
        <button onClick={generarRecomendacionIA} style={{ backgroundColor: '#003087', color: 'white', padding: '0.5rem 1rem' }}>
          Generar Recomendación IA
        </button>
        {recomendacionIA && (
          <div style={{ marginTop: '1rem', fontStyle: 'italic' }}>{recomendacionIA}</div>
        )}
      </div>

      <button onClick={generarPDF} style={{ marginTop: '2rem', backgroundColor: '#007A33', color: 'white', padding: '0.5rem 1rem' }}>
        Descargar PDF
      </button>
    </div>
  );
}
