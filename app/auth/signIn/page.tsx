// app/signin/page.tsx (Server Component)
import { getCsrfToken } from "next-auth/react";
import SignIn from "./signin";

export default async function SignInPage() {
  const csrfToken = await getCsrfToken();

  return <SignIn csrfToken={csrfToken ?? ""} />;
}
