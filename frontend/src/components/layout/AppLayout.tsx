import { Outlet } from "react-router";

import { Header } from "./Header";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      <main className="py-10">
        <Outlet />
      </main>
    </div>
  );
}