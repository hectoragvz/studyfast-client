import { create } from "zustand";

export const useSessionsStore = create((set) => ({
  sessions: [],
  cards: [],
  setSessions: (newSessions) => set({ sessions: newSessions }),
  setCards: (newCards) => set({ cards: newCards }),
  updateCardState: (cardId, newState) =>
    set((state) => ({
      cards: state.cards.map((card) =>
        card.id === cardId ? { ...card, state: newState } : card
      ),
    })),
}));
