import { data } from "@/data";
import { create } from "zustand";

interface Extension {
  name: string;
  id: number;
  isActive: boolean;
}

type ExtensionStore = {
  extentions: Extension[];
  toggleExtension: (id: number) => void;
  removeExtension: (id: number) => void;
};

export const useExtensionStore = create<ExtensionStore>()((set) => ({
  extentions: data,
  toggleExtension: (id) =>
    set((state) => ({
      extentions: state.extentions.map((ext) =>
        ext.id === id ? { ...ext, isActive: !ext.isActive } : ext
      ),
    })),
  removeExtension: (id) =>
    set((state) => ({
      extentions: state.extentions.filter((ext) => ext.id !== id),
    })),
}));
