"use client";

import dynamic from "next/dynamic";

const AdminApp = dynamic(() => import("../../admin_components/App"), { ssr: false });

export default function AdminPage() {
  return (
    <div className="w-full h-screen">
      <AdminApp />
    </div>
  );
}
