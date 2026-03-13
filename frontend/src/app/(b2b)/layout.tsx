import { Header } from "@/components/layout/Header";
import React from "react";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { CartProvider } from "@/features/cart/hooks/useCart";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session || session.role.toLowerCase() !== "partner") {
    redirect("/login");
  }

  return (
    <div>
      <Header sessionUser={session} />
      <CartProvider>
        {children}
      </CartProvider>
    </div>
  )
}

export default Layout
