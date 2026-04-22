import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";

export async function requireSession() {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  return session;
}