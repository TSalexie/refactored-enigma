import { create } from 'zustand';
import { Page } from '@productivity-app/shared';

interface PagesState {
  pages: Page[];
  selectedPageId: string | null;
  loading: boolean;
  error: string | null;
  addPage: (page: Omit<Page, 'id' | 'created_at' | 'updated_at'>) => void;
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
  selectPage: (id: string | null) => void;
  setPages: (pages: Page[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePagesStore = create<PagesState>((set) => ({
  pages: [],
  selectedPageId: null,
  loading: false,
  error: null,

  addPage: (page) => {
    const newPage: Page = {
      ...page,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Page;

    set((state) => ({
      pages: [...state.pages, newPage],
    }));
  },

  updatePage: (id, updates) => {
    set((state) => ({
      pages: state.pages.map((page) =>
        page.id === id
          ? { ...page, ...updates, updated_at: new Date().toISOString() }
          : page
      ),
    }));
  },

  deletePage: (id) => {
    set((state) => ({
      pages: state.pages.filter((page) => page.id !== id),
      selectedPageId: state.selectedPageId === id ? null : state.selectedPageId,
    }));
  },

  selectPage: (id) => set({ selectedPageId: id }),
  setPages: (pages) => set({ pages }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
