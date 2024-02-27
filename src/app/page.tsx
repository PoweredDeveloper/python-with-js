"use client"
import React from 'react'
import { runCwd } from '@/app/utils/api-client'

export default function Home() {
  function consoleData() {
    const response = runCwd(
      "Bob",
      () => {
        console.log("Some")
      }
    )
    console.log(response)
  }

  return (
    <main>
      <button
        onClick={() => consoleData()}
      >
        Click
      </button>
    </main>
  );
}
