import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Posts } from '../service/posts/posts';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailsPage implements OnInit {

  data: any = null;      // // Will hold the selected property/post
  loading = true;        // // Show loading state while fetching
  error = '';            // // Error message if something goes wrong

  constructor(
    private route: ActivatedRoute, // // Used to read :id from the URL
    private posts: Posts           // // Service to access Firestore posts
  ) {

    // // Subscribe to route parameters (e.g. /details/ABC123)
    this.route.params.subscribe(async params => {
      const id = params['id'];                // // Get id from URL
      console.log('Post ID from route:', id);

      try {
        this.loading = true;
        this.error = '';

        // // If the Posts service has no data yet, load all posts from Firestore
        if (!this.posts.data || this.posts.data.length === 0) {
          await this.posts.getAllPosts();     // // Fill Posts.data array
        }

        const post = this.posts.getPostById(id); // // Find the post in the array
        console.log('Post Data:', post);

        if (!post) {
          this.error = 'Property not found.';
        } else {
          this.data = post;
        }

      } catch (e) {
        console.error('Error loading post details:', e);
        this.error = 'Could not load property details.';
      } finally {
        this.loading = false;
      }
    });
  }

  ngOnInit() {}

  // // Helper to build the title safely
  getTitle() {
    return this.data?.userInfo?.name
      ? `Listing by: ${this.data.userInfo.name}`
      : 'Property details';
  }
}
