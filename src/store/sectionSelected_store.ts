import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

import { DrawerSection_Type } from "@/config";

export type SectionSelected_Interface = DrawerSection_Type;

interface State {
  sectionSelected: SectionSelected_Interface;
  setSectionSelected: (value: SectionSelected_Interface) => void;
}

const _useSectionSelectedStore = create<State>((set) => ({
  sectionSelected: "DASHBOARD",
  setSectionSelected: (value) => set({ sectionSelected: value }),
}));

// https://github.com/pmndrs/zustand#selecting-multiple-state-slices
export const useSectionSelectedStore = () => {
  const { sectionSelected, setSectionSelected } = _useSectionSelectedStore(
    useShallow((state) => ({
      sectionSelected: state.sectionSelected,
      setSectionSelected: state.setSectionSelected,
    }))
  );

  return { sectionSelected, setSectionSelected };
};
