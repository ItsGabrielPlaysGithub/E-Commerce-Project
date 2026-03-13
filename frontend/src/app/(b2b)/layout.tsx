import { Header } from "@/components/layout/Header";
import React from "react";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session || session.role.toLowerCase() !== "partner") {
    redirect("/login");
  }

  return (
    <div>
      <Header />
        {children}
    </div>
  )
}

export default Layout
