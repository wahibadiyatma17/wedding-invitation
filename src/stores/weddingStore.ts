import { create } from 'zustand';
import { WeddingInvitation, RSVP, GuestbookEntry, CountdownTimer } from '@/types/wedding';

interface WeddingStore {
  invitation: WeddingInvitation | null;
  countdown: CountdownTimer;
  isLoading: boolean;

  setInvitation: (invitation: WeddingInvitation) => void;
  updateCountdown: () => void;
  addRSVP: (rsvp: RSVP) => void;
  addGuestbookEntry: (entry: Omit<GuestbookEntry, 'id' | 'submittedAt'>) => void;
  setGuestName: (name: string) => void;
}

export const useWeddingStore = create<WeddingStore>((set, get) => ({
  invitation: null,
  countdown: { days: 0, hours: 0, minutes: 0, seconds: 0 },
  isLoading: true,

  setInvitation: (invitation) => {
    set({ invitation, isLoading: false });
  },

  updateCountdown: () => {
    const { invitation } = get();
    if (!invitation?.events.length) return;

    const weddingDate = invitation.events[0].date;
    const now = new Date().getTime();
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

  addRSVP: (rsvp) => {
    const { invitation } = get();
    if (!invitation) return;

    const updatedInvitation = {
      ...invitation,
      rsvps: [...invitation.rsvps, rsvp]
    };
    
    set({ invitation: updatedInvitation });
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

  addGuestbookEntry: (entry) => {
    const { invitation } = get();
    if (!invitation) return;

    const newEntry: GuestbookEntry = {
      ...entry,
      id: `guestbook-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      submittedAt: new Date()
    };

    const updatedInvitation = {
      ...invitation,
      guestbookEntries: [newEntry, ...invitation.guestbookEntries]
    };

    set({ invitation: updatedInvitation });
  }
}));