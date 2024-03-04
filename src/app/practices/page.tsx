"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@mui/material/styles";

import { WithDrawer } from "@/components/forThisApp";
import { SearchInput, SelectInput } from "@/components/generic";
import { useDrawerOpenStore } from "@/store";
import { MOCKED_PRACTICES } from "@/mocked";
import { useSectionSelectedStore } from "@/store/sectionSelected_store";

import { AddNewModal, Header, ListOfItems } from "./_components";
import { useSupabase } from "@/components/generic/supabase";
import { theme } from "@/config";

export default function Practices() {
  const router = useRouter();
  const { setDrawerOpen } = useDrawerOpenStore();
  const { setSectionSelected } = useSectionSelectedStore();
  const { supabase, session } = useSupabase();

  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [displayBy, setDisplayBy] = useState("practice");
  const [filterByText, setFilterByText] = useState("");

  const onClose = () => {
    setDrawerOpen(true);
    setSectionSelected("DASHBOARD");
    setTimeout(() => router.replace("/"), 300);
  };

  console.log(`supabase`, supabase);
  console.log(`session`, session);

  return (
    <ThemeProvider theme={theme}>
      <WithDrawer>
        <div className="flex flex-1 flex-col">
          <Header onClose={onClose} onAddNew={() => setShowAddNewModal(true)} />
          <div className="flex flex-1 justify-center overflow-y-scroll">
            <div className="p-5 flex flex-1 flex-col max-w-xl">
              <SelectInput displayBy={displayBy} setDisplayBy={setDisplayBy} />
              <div className="h-3" />
              <SearchInput value={filterByText} onChange={setFilterByText} />
              <div className="h-3" />
              <ListOfItems
                items={MOCKED_PRACTICES}
                filterByText={filterByText}
              />
              <div className="h-5" />
            </div>
          </div>
        </div>
        <AddNewModal
          open={showAddNewModal}
          handleClose={() => setShowAddNewModal(false)}
        />
      </WithDrawer>
    </ThemeProvider>
  );
}
