"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import { createBrowserClient } from "@/utils/supabase/client";
import { colors } from "@/config";

type SupabaseContext = {
  supabase: any;
  session: any;
};

// @ts-ignore
const Context = createContext<SupabaseContext>();

export const SupabaseProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  const router = useRouter();
  const [supabase] = useState(() => createBrowserClient());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) router.replace("/login");

    setTimeout(() => setLoading(false), 1000);
  }, [session, router]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <CircularProgress sx={{ color: colors.main }} />
      </div>
    );
  }

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  );
};

export const useSupabase = () => useContext(Context);
