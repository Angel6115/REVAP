// src/pages/dashboard.tsx

import { NextPage } from 'next'
import Head from 'next/head'
import DashboardLayout from '@/components/DashboardLayout'

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Panel de Control | RE-VAP</title>
        <meta name="description" content="Panel de control de RE-VAP: gestiona expedientes, pacientes y referidos" />
      </Head>

      <DashboardLayout>
        <h1 className="text-3xl font-bold text-primary mb-4">Panel de Control</h1>
        <p className="text-gray-700">
          Aquí puedes gestionar expedientes, pacientes y referidos.
        </p>
      </DashboardLayout>
    </>
  )
}

export default DashboardPage
