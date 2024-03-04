"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { WithDrawer } from "@/components/forThisApp";
import { SearchInput, SelectInput } from "@/components/generic";
import { useDrawerOpenStore } from "@/store";
import { MOCKED_PRACTICES } from "@/mocked";
import { useSectionSelectedStore } from "@/store/sectionSelected_store";
import { theme } from "@/config";

import { AddNewModal, Header, ListOfItems, SnackBar } from "./_components";

const queryClient = new QueryClient();

export default function Practices() {
  const router = useRouter();
  const { setDrawerOpen } = useDrawerOpenStore();
  const { setSectionSelected } = useSectionSelectedStore();

  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [displayBy, setDisplayBy] = useState("practice");
  const [filterByText, setFilterByText] = useState("");
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [errorToastOpen, setErrorToastOpen] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState("");

  const onClose = () => {
    setDrawerOpen(true);
    setSectionSelected("DASHBOARD");
    setTimeout(() => router.replace("/"), 300);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <WithDrawer>
          <div className="flex flex-1 flex-col">
            <Header
              onClose={onClose}
              onAddNew={() => setShowAddNewModal(true)}
            />
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
                  showErrorToast={() => setErrorToastOpen(true)}
                  setErrorToastMessage={setErrorToastMessage}
                />
                <div className="h-5" />
              </div>
            </div>
          </div>
          <AddNewModal
            open={showAddNewModal}
            handleClose={() => setShowAddNewModal(false)}
            showSuccessToast={() => setSuccessToastOpen(true)}
            showErrorToast={() => setErrorToastOpen(true)}
            setErrorToastMessage={setErrorToastMessage}
          />
          {/* ───────────────────────────────────── */}
          <SnackBar
            open={successToastOpen}
            handleClose={() => setSuccessToastOpen(false)}
            text="The practice was added successfully!"
            type="success"
          />
          <SnackBar
            open={errorToastOpen}
            handleClose={() => setErrorToastOpen(false)}
            type="error"
            text={errorToastMessage}
          />
        </WithDrawer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
