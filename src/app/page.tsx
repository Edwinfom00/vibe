"use client";
import { useTRPC } from '@/trpc/client'
import React from 'react'

const Page = () => {

  const trpc = useTRPC();

  trpc.hello.queryOptions({ text: "123" })

  return (
    <div>
      Hello World
    </div>
  )
}

export default Page