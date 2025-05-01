"use client"

//create this because cant make the layout.tsx as use client

import { SessionProvider } from "next-auth/react"

export function Providers({ children }: { children: React.ReactNode }) {
    return <SessionProvider>
        {children}
    </SessionProvider>
}