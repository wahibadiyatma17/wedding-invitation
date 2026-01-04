export interface TimelineStory {
  id: string;
  phase: string;
  title: string;
  description: string;
  date?: string;
  image: string;
}

export interface Couple {
  bride: Person;
  groom: Person;
  weddingDate: Date;
  story?: string;
  spiritualQuote?: string;
  timeline?: TimelineStory[];
}

export interface Person {
  name: string;
  fullName: string;
  photo?: string;
  parents: {
    father: string;
    mother: string;
  };
}

export interface WeddingEvent {
  id: string;
  type: 'akad' | 'resepsi' | 'ceremony' | 'reception';
  title: string;
  date: Date;
  time: {
    start: string;
    end?: string;
  };
  venue: {
    name: string;
    address: string;
    mapUrl?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

export interface WeddingGift {
  bankAccounts: BankAccount[];
  message?: string;
}

export interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
}

export interface GuestbookEntry {
  id: string;
  guestName: string;
  message: string;
  attendanceStatus?: 'attending' | 'not-attending' | 'maybe';
  submittedAt: Date;
  location?: string;
}

export interface WeddingInvitation {
  couple: Couple;
  events: WeddingEvent[];
  gifts: WeddingGift;
  guestbookEntries: GuestbookEntry[];
  guestName?: string;
  musicUrl?: string;
}

export interface CountdownTimer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}