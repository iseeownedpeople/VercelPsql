'use client'
// Remember you must use an AuthProvider for 
// client components to useSession
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import UserCard from '../components/UserCard'

export default function ClientPage() { 

    // if (session?.user.role !== "admin"
    //     && session?.user.role !== "manager") {
    //     return <h1 className="text-5xl">Access Denied</h1>
    // }
 
    return (
        <section className="flex flex-col gap-6">ASD
        </section>
    )
}