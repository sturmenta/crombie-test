"use client";

import { createContext, useContext, useState } from "react";
import { createClient } from "@/utils/supabase/client";

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
  const [supabase] = useState(() => createClient());

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  );
};

export const useSupabase = () => useContext(Context);
