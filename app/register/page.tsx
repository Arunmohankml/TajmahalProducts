"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/login");
  }, [router]);
  return <div className="p-16 text-center text-xs">Redirecting to login...</div>;
}
