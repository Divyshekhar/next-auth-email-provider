"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    await signIn("email", {
      email: email,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <form method="post" onSubmit={handleSubmit} className="flex flex-col items-center pt-50">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Name
        <Input
          name="name"
          type="text"
          value={username}
          className="w-50 p-4"
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="p-4">
        Email
        <Input
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-50"
        />
      </label>

      <Button type="submit" className="w-20">Sign in</Button>
    </form>
  );
}
