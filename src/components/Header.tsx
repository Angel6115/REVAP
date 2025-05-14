import React from 'react'

export default function Header({ title }: { title: string }) {
  return (
    <header className="w-full py-4 px-6 bg-blue-800 text-white shadow flex items-center justify-between">
      <h1 className="text-xl font-semibold">{title}</h1>
    </header>
  )
}
