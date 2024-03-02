import Navigation from "@/components/navigation";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full relative">
      <Navigation />
      {children}
    </main>
  );
};

export default layout;
