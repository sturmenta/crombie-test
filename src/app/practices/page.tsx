"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@mui/material/styles";

import { WithDrawer } from "@/components/forThisApp";
import { SearchInput, SelectInput } from "@/components/generic";
import { theme } from "@/config";
import { useDrawerOpenStore } from "@/store";
import { MOCKED_PRACTICES } from "@/mocked";
import { useSectionSelectedStore } from "@/store/sectionSelected_store";

import { CloseHeader, ListOfItems } from "./_components";

export default function Practices() {
  const router = useRouter();
  const { setDrawerOpen } = useDrawerOpenStore();
  const { sectionSelected, setSectionSelected } = useSectionSelectedStore();

  const [displayBy, setDisplayBy] = useState("practice");
  const [filterByText, setFilterByText] = useState("");

  const onClose = () => {
    setDrawerOpen(true);
    setSectionSelected("DASHBOARD");
    setTimeout(() => router.push("/"), 300);
  };

  return (
    <ThemeProvider theme={theme}>
      <WithDrawer>
        {sectionSelected === "PRACTICES" && (
          <div className="flex flex-1 flex-col">
            <CloseHeader onClose={onClose} />
            <div className="flex flex-1 justify-center overflow-y-scroll">
              <div className="p-5 flex flex-1 flex-col max-w-xl">
                <SelectInput
                  displayBy={displayBy}
                  setDisplayBy={setDisplayBy}
                />
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
        )}
      </WithDrawer>
    </ThemeProvider>
  );
}
