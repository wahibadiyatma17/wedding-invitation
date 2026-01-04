import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  startAfter, 
  onSnapshot, 
  serverTimestamp,
  Timestamp,
  DocumentData,
  QuerySnapshot,
  Unsubscribe
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface GuestbookEntry {
  id: string;
  guestName: string;
  message: string;
  attendanceStatus?: 'attending' | 'not-attending' | 'maybe';
  submittedAt: Date;
}

export interface CreateGuestbookEntry {
  guestName: string;
  message: string;
  attendanceStatus?: 'attending' | 'not-attending' | 'maybe';
}

const COLLECTION_NAME = 'guestbook';

// Convert Firestore document to GuestbookEntry
function convertFirestoreDoc(doc: DocumentData): GuestbookEntry {
  const data = doc.data();
  return {
    id: doc.id,
    guestName: data.guestName,
    message: data.message,
    attendanceStatus: data.attendanceStatus,
    submittedAt: data.submittedAt?.toDate() || new Date(),
  };
}

// Add a new guestbook entry
export async function addGuestbookEntry(entry: CreateGuestbookEntry): Promise<string> {
  try {
    // Validate input
    if (!entry.guestName.trim()) {
      throw new Error('Guest name is required');
    }
    
    if (!entry.message.trim() || entry.message.length < 10) {
      throw new Error('Message must be at least 10 characters long');
    }
    
    if (entry.message.length > 500) {
      throw new Error('Message must be less than 500 characters');
    }

    const docData = {
      guestName: entry.guestName.trim(),
      message: entry.message.trim(),
      attendanceStatus: entry.attendanceStatus || null,
      submittedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding guestbook entry:', error);
    throw error;
  }
}

// Get guestbook entries with pagination
export async function getGuestbookEntries(limitCount = 10, lastDoc?: DocumentData): Promise<GuestbookEntry[]> {
  try {
    let q = query(
      collection(db, COLLECTION_NAME),
      orderBy('submittedAt', 'desc'),
      limit(limitCount)
    );

    if (lastDoc) {
      q = query(
        collection(db, COLLECTION_NAME),
        orderBy('submittedAt', 'desc'),
        startAfter(lastDoc),
        limit(limitCount)
      );
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertFirestoreDoc);
  } catch (error) {
    console.error('Error fetching guestbook entries:', error);
    throw error;
  }
}

// Subscribe to real-time guestbook updates
export function subscribeToGuestbook(
  callback: (entries: GuestbookEntry[]) => void,
  errorCallback?: (error: Error) => void,
  limitCount = 50
): Unsubscribe {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('submittedAt', 'desc'),
      limit(limitCount)
    );

    return onSnapshot(
      q,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const entries = querySnapshot.docs.map(convertFirestoreDoc);
        callback(entries);
      },
      (error) => {
        console.error('Error in guestbook subscription:', error);
        if (errorCallback) {
          errorCallback(error as Error);
        }
      }
    );
  } catch (error) {
    console.error('Error setting up guestbook subscription:', error);
    if (errorCallback) {
      errorCallback(error as Error);
    }
    // Return a no-op unsubscribe function
    return () => {};
  }
}

// Get total count of entries (for analytics)
export async function getGuestbookCount(): Promise<number> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting guestbook count:', error);
    return 0;
  }
}

// Get attendance statistics
export async function getAttendanceStats(): Promise<{
  attending: number;
  notAttending: number;
  maybe: number;
  noResponse: number;
}> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const stats = {
      attending: 0,
      notAttending: 0,
      maybe: 0,
      noResponse: 0,
    };

    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      switch (data.attendanceStatus) {
        case 'attending':
          stats.attending++;
          break;
        case 'not-attending':
          stats.notAttending++;
          break;
        case 'maybe':
          stats.maybe++;
          break;
        default:
          stats.noResponse++;
      }
    });

    return stats;
  } catch (error) {
    console.error('Error getting attendance stats:', error);
    return {
      attending: 0,
      notAttending: 0,
      maybe: 0,
      noResponse: 0,
    };
  }
}