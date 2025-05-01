"use client"
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
export const Appbar = () => {
    const {data: session, status} = useSession();
    return <div>
        <div className="flex justify-end mr-5 mt-5">
            {status === "loading" ? (<p>Loading...</p>) :
                status === "unauthenticated" ? (
                    <Button onClick={() => {
                        signIn()
                    }} className="mr-2">
                        Sign In
                    </Button>) : (
                    <div className="flex flex-row items-center gap-4">
                        <div className="pt-2">Hello! {session?.user?.email}</div>
                        <Button onClick={() => {
                            signOut()
                        }}>
                            Sign Out
                        </Button>
                    </div>
                )
            }
        </div>
        <div>
            {JSON.stringify(status)}
            <br/>
            {JSON.stringify(session?.user?.email)}
            <br />
            {/* {JSON.stringify(session)} */}

        </div>
    </div>
}