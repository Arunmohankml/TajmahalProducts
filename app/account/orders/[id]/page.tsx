"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrderDetailPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/orders");
  }, [router]);
  return <div className="p-16 text-center text-xs">Redirecting to inquiries...</div>;
}
