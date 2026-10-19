"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BuildRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/shop");
  }, [router]);
  return <div className="p-16 text-center text-xs">Redirecting to carpet catalogue...</div>;
}
