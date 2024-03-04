"use client";

import { WithDrawer } from "@/components/forThisApp";
import { SupabaseAuthRedirect } from "@/components/generic";

export default function Home() {
  return (
    <SupabaseAuthRedirect>
      <WithDrawer />
    </SupabaseAuthRedirect>
  );
}
