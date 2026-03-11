"use client";

import React from "react";
import { Header } from "../../components/layout/Header";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
