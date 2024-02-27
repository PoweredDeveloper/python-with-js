import type { NextApiRequest, NextApiResponse } from 'next'
import { spawn } from 'child_process'
import path from 'path'
import { transferChildProcessOutput } from '@/app/utils/shell'
import { NextResponse } from 'next/server'

export default function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  return NextResponse.json({ name: name});

  // const cmd = spawn(
  //   'python3',
  //   [path.join(process.cwd(), 'scripts/cwd.py'), name || ''],
  //   {
  //     cwd: process.cwd()
  //   }
  // )
  
  // console.log(cmd)

  // transferChildProcessOutput(cmd, response)
}
