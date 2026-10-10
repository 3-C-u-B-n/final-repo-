import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CRITICAL: Must pass firebaseConfig.firestoreDatabaseId to getFirestore
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Error Handling specification
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// CRITICAL CONSTRAINT: Test connection on initial boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase connection verified successfully.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration: Client is offline.');
    }
  }
}

// Run test on module import
testConnection();

// Authentication helpers
export async function signInWithGoogle(): Promise<User> {
  try {
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, googleProvider);
    // Sync user profile to Firestore
    if (result.user) {
      await syncUserProfile(result.user);
    }
    return result.user;
  } catch (error: any) {
    console.error('Google Sign-in Error:', error);
    throw error;
  }
}

export async function logOut(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign Out Error:', error);
    throw error;
  }
}

// User Profile Sync
export async function syncUserProfile(user: User) {
  const path = `users/${user.uid}`;
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(
      userRef,
      {
        userId: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Người Yêu Cổ Phục',
        photoURL: user.photoURL || '',
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Interface for saved designs
export interface SavedOutfitRecord {
  id: string;
  userId: string;
  authorName: string;
  authorPhoto?: string;
  title: string;
  gender: 'female' | 'male';
  occasionId: string;
  garmentId: string;
  fabricId: string;
  colorId: string;
  customColorHex?: string;
  customPantHex?: string;
  headpieceId: string;
  jewelryId: string;
  handheldId: string;
  footwearId: string;
  backgroundId: string;
  visualEffect?: string;
  windSpeed?: string;
  lighting?: string;
  harmonyScore: number;
  traditionStatus: string;
  note?: string;
  isPublic?: boolean;
  likesCount?: number;
  createdAt: string;
  updatedAt: string;
}

// Save Outfit to Firestore
export async function saveOutfit(outfitData: Omit<SavedOutfitRecord, 'id' | 'createdAt' | 'updatedAt'>, existingId?: string): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Cần đăng nhập để lưu thiết kế!');
  }

  const outfitId = existingId || `outfit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const path = `savedOutfits/${outfitId}`;

  const payload: SavedOutfitRecord = {
    ...outfitData,
    id: outfitId,
    userId: user.uid,
    authorName: user.displayName || 'Người Yêu Cổ Phục',
    authorPhoto: user.photoURL || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'savedOutfits', outfitId), payload);
    return outfitId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Delete Outfit
export async function deleteSavedOutfit(outfitId: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error('Cần đăng nhập');
  const path = `savedOutfits/${outfitId}`;
  try {
    await deleteDoc(doc(db, 'savedOutfits', outfitId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Real-time listener for current user's saved outfits
export function subscribeToUserOutfits(
  userId: string,
  onUpdate: (outfits: SavedOutfitRecord[]) => void,
  onError?: (err: any) => void
) {
  const path = 'savedOutfits';
  const q = query(
    collection(db, path),
    where('userId', '==', userId)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const results: SavedOutfitRecord[] = [];
      snapshot.forEach((docSnap) => {
        results.push(docSnap.data() as SavedOutfitRecord);
      });
      // Sort newest first
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      onUpdate(results);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// Fetch public gallery outfits
export async function fetchPublicOutfits(): Promise<SavedOutfitRecord[]> {
  const path = 'savedOutfits';
  try {
    const q = query(
      collection(db, path),
      where('isPublic', '==', true),
      limit(24)
    );
    const snap = await getDocs(q);
    const results: SavedOutfitRecord[] = [];
    snap.forEach((docSnap) => {
      results.push(docSnap.data() as SavedOutfitRecord);
    });
    results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return results;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}
