import { Injectable } from '@angular/core';
import { doc, docData, DocumentReference, Firestore, getDoc, setDoc, updateDoc, collection, addDoc, deleteDoc, collectionData, Timestamp } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})
export class Database {
  
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  user$ = authState(this.auth).pipe(filter(user => user !== null), map(user => user!));
  router: Router = inject(Router);

  constructor() { }

}
