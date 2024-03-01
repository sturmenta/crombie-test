import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

export type DrawerOpen_Interface = boolean;

interface State {
  drawerOpen: DrawerOpen_Interface;
  setDrawerOpen: (value: DrawerOpen_Interface) => void;
}

const _useDrawerOpenStore = create<State>((set) => ({
  drawerOpen: true,
  setDrawerOpen: (value) => set({ drawerOpen: value }),
}));

// https://github.com/pmndrs/zustand#selecting-multiple-state-slices
export const useDrawerOpenStore = () => {
  const { drawerOpen, setDrawerOpen } = _useDrawerOpenStore(
    useShallow((state) => ({
      drawerOpen: state.drawerOpen,
      setDrawerOpen: state.setDrawerOpen,
    }))
  );

  return { drawerOpen, setDrawerOpen };
};
