import { addNote, deleteNote, getNotes } from "@/actions/note";
import { create } from "zustand";

// Interfaces for Note, Initial State, and Store Actions
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
  loading: boolean;
  error: string | null;
}

export interface IStateActions {
  fetchNotes: () => Promise<void>;
  addNewNote: (note: INote) => Promise<void>;
  removeNote: (id: string) => Promise<void>;
  updateForm: (note: Partial<INote>) => void;
}

export interface INoteStore extends IInitialState, IStateActions {}

export const useNoteStore = create<INoteStore>((set) => ({
  notes: [],
  form: {
    title: "",
    coordinates: { lat: 0, lng: 0 },
    content: "",
    date: "",
    layer: "",
    tags: [],
  },
  loading: false,
  error: null,

  // Fetch all notes from MongoDB
  fetchNotes: async () => {
    set({ loading: true, error: null });
    try {
      const notes = await getNotes(); // Fetch notes from MongoDB
      set({ notes, loading: false });
    } catch (error) {
      console.error("Error fetching notes:", error);
      set({ loading: false, error: "Failed to load notes" });
    }
  },

  // Add a new note both in MongoDB and in the state
  addNewNote: async (note: INote) => {
    set({ loading: true, error: null });
    try {
      await addNote(note); // Add note to MongoDB
      set((state) => ({
        notes: [...state.notes, note],
        loading: false,
      }));
    } catch (error) {
      console.error("Error adding note:", error);
      set({ loading: false, error: "Failed to add note" });
    }
  },

  // Remove a note both from MongoDB and from the state
  removeNote: async (id: string) => {
    console.log(id);
    set({ loading: true, error: null });
    try {
      await deleteNote(id); // Delete note from MongoDB
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error("Error deleting note:", error);
      set({ loading: false, error: "Failed to delete note" });
    }
  },

  // Update the form state
  updateForm: (formData: Partial<INote>) => {
    set((state) => ({
      form: { ...state.form, ...formData },
    }));
  },
}));
