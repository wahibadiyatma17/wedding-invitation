import { create } from 'zustand';
import { WeddingInvitation, CountdownTimer } from '@/types/wedding';
import { generateId, getCurrentTime, getCurrentDate } from '@/utils/client-safe';
import { 
  GuestbookEntry, 
  CreateGuestbookEntry, 
  addGuestbookEntry as addFirestoreGuestbookEntry,
  subscribeToGuestbook 
} from '@/services/guestbook';

interface WeddingStore {
  invitation: WeddingInvitation | null;
  countdown: CountdownTimer;
  guestbookEntries: GuestbookEntry[];
  isLoading: boolean;
  isGuestbookLoading: boolean;
  guestbookError: string | null;

  setInvitation: (invitation: WeddingInvitation) => void;
  updateCountdown: () => void;
  addGuestbookEntry: (entry: CreateGuestbookEntry) => Promise<void>;
  setGuestbookEntries: (entries: GuestbookEntry[]) => void;
  setGuestbookLoading: (loading: boolean) => void;
  setGuestbookError: (error: string | null) => void;
  subscribeToGuestbookUpdates: () => (() => void) | void;
  setGuestName: (name: string) => void;
}

export const useWeddingStore = create<WeddingStore>((set, get) => ({
  invitation: null,
  countdown: { days: 0, hours: 0, minutes: 0, seconds: 0 },
  guestbookEntries: [],
  isLoading: true,
  isGuestbookLoading: false,
  guestbookError: null,

  setInvitation: (invitation) => {
    set({ invitation, isLoading: false });
  },

  updateCountdown: () => {
    const { invitation } = get();
    if (!invitation?.events.length) return;

    const weddingDate = invitation.events[0].date;
    const now = getCurrentTime();
    const distance = weddingDate.getTime() - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      set({ countdown: { days, hours, minutes, seconds } });
    } else {
      set({ countdown: { days: 0, hours: 0, minutes: 0, seconds: 0 } });
    }
  },

  setGuestName: (guestName) => {
    const { invitation } = get();
    if (!invitation) return;

    set({
      invitation: {
        ...invitation,
        guestName
      }
    });
  },

  addGuestbookEntry: async (entry) => {
    set({ isGuestbookLoading: true, guestbookError: null });
    
    try {
      // Add to Firestore
      await addFirestoreGuestbookEntry(entry);
      
      // Note: The real-time listener will automatically update the store
      // when the new entry is added to Firestore
      set({ isGuestbookLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add guestbook entry';
      set({ 
        isGuestbookLoading: false, 
        guestbookError: errorMessage 
      });
      throw error;
    }
  },

  setGuestbookEntries: (entries) => {
    set({ guestbookEntries: entries });
  },

  setGuestbookLoading: (loading) => {
    set({ isGuestbookLoading: loading });
  },

  setGuestbookError: (error) => {
    set({ guestbookError: error });
  },

  subscribeToGuestbookUpdates: () => {
    try {
      return subscribeToGuestbook(
        (entries) => {
          set({ guestbookEntries: entries, guestbookError: null });
        },
        (error) => {
          set({ guestbookError: error.message });
        }
      );
    } catch (error) {
      console.error('Failed to subscribe to guestbook updates:', error);
      set({ guestbookError: 'Failed to connect to real-time updates' });
    }
  },
}));