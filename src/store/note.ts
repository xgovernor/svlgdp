import { create } from "zustand";

export interface INote {
  id: string;
  title: string;
  coordinates: { lat: number; lng: number };
  content: string;
  date: string;
  layer: string;
  overlay?: string[];
  zoom?: number;
  tags: string[];
}

export interface IInitialState {
  notes: INote[];
  form: Partial<INote>;
}

export interface IStateActions {
  setNote: (note: INote) => void;
  deleteNote: (id: string) => void;
  updateForm: (note: Partial<INote>) => void;
}

export interface INoteStore extends IInitialState, IStateActions {}

const notes: INote[] = [
  {
    id: "1",
    title: "Urban Development Site",
    coordinates: { lat: 40.7128, lng: -74.006 },
    content:
      "Potential area for new urban development project. Need to analyze surrounding infrastructure.",
    date: "2023-09-15",
    layer: "Satellite",
    tags: ["Urban", "Development", "Infrastructure"],
  },
  {
    id: "2",
    title: "Forest Conservation Area",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    content:
      "Protected forest area with diverse ecosystem. Important for biodiversity studies.",
    date: "2023-09-10",
    layer: "Terrain",
    tags: ["Conservation", "Biodiversity", "Forest"],
  },
];

export const useNoteStore = create<INoteStore>((set) => ({
  notes,
  form: {
    title: "",
    coordinates: { lat: 0, lng: 0 },
    content: "",
    date: "",
    layer: "",
    tags: [],
  },
  setNote: (note) => {
    set({ notes: [...notes, note] });
  },
  deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((item) => item.id !== id),
    }));
  },
  updateForm: (formData) => {
    set((state) => ({ form: { ...state.form, ...formData } }));
  },
}));
