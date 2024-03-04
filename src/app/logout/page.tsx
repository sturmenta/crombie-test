import { createServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../_shared/submit-button";

export default async function Logout() {
  const signOut = async () => {
    "use server";

    const supabase = createServerClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        action={signOut}
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      >
        <SubmitButton
          formAction={signOut}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Logging out..."
        >
          Logout
        </SubmitButton>
      </form>
    </div>
  );
}
