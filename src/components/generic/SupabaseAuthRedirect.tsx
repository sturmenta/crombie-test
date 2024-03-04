"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

export const SupabaseAuthRedirect = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);

  const getUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("getUser");

    if (!user) return router.replace("/login");
    setLoading(false);
  }, [supabase.auth, router]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (loading)
    return (
      <div className="flex flex-1 items-center justify-center">Loading...</div>
    );

  return children;
};
