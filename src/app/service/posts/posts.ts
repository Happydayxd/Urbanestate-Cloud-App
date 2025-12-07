import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root',
})
export class Posts {
  data: any = [];

  private firebaseConfig = {
    apiKey: "AIzaSyCsk-JTvq9mxE6o-S4xokSgqs102pMLygk",
    projectId: "b8is138-mon-ionic-f8600",
  };
  private app: any;
  private db: any;

  constructor() {
    this.app = initializeApp(this.firebaseConfig);   //Initialise Firebase app
    this.db = getFirestore(this.app);                //Get Firestore instance
  }

  async getAllPosts() {
    this.data = [];                                  //Clear local cache
    let _this = this;                                //Keep 'this' (lecture style)

    const querySnapshot = await getDocs(collection(this.db, "post")); //Read 'post' collection
    querySnapshot.forEach((doc) => {
      let postData: any = doc.data();                //Get document data as object
      postData.id = doc.id;                          //Attach Firestore document ID
      _this.data.push(postData);                     //Store in local array
    });

    return this.data;                                //Return all posts
  }

  getPostById(id: number) {
    return this.data.find((post: any) => post.id == id); //Find post in local cache
  }

  // ---------------------------------------------------------------------------
  // addPost(post)
  // Adds a NEW property document into the "post" collection.
  // The 'post' object is built in the Add Property page (form) and passed here.
  // ---------------------------------------------------------------------------
  async addPost(post: any) {
    try {
      const docRef = await addDoc(collection(this.db, "post"), post); //Insert into Firestore
      console.log("Document written with ID: ", docRef.id);           //Log new document ID
      return docRef.id;                                               //Return ID to caller
    } catch (e) {
      console.error("Error adding document: ", e);                     //Log error if any
      throw e;                                                         //Re-throw so caller can handle
    }
  }

  // ---------------------------------------------------------------------------
  // Optional: seedDemoPost()
  // If we want to KEEP the original hard-coded example from the lecture,
  // We could move it here and call this method only for testing.
  // ---------------------------------------------------------------------------
  async seedDemoPost() {
    try {
      const docRef = await addDoc(collection(this.db, "post"), {
        userInfo: {
          name: 'Patrick O\'Brien - Realtor',
          profileImage: 'assets/img/man.jpg',
          location: 'Cork, Ireland'
        },
        media: [
          { type: 'image', src: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28' }
        ],
        comments: [
          { user: 'Listing Info', text: '€310,000 • 2 Bed • 1 Bath • 75 m²' },
          { user: 'Location', text: 'Overlooking the River Lee.' },
          { user: 'Buyer', text: 'Are pets allowed?' }
        ]
      });

      console.log("Demo document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding demo document: ", e);
    }
  }
}
