import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Posts {

  // ---------------------------------------------------------------------------
  // Ten Irish real estate listings for the Properties tab.
  // ---------------------------------------------------------------------------
  data: any = [

    // -----------------------------------------------------------------------
    // 1. Dublin - Grand Canal Dock Apartment
    // -----------------------------------------------------------------------
    {
      id: 1,
      userInfo: {
        name: 'Emma Murphy - Estate Agent',
        profileImage: 'assets/img/woman.jpg',
        location: 'Dublin, Ireland'
      },
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c' }
      ],
      comments: [
        { user: 'Listing Info', text: '€495,000 • 2 Bed • 2 Bath • 87 m²' },
        { user: 'Location', text: 'Grand Canal Dock — the Silicon Docks area.' },
        { user: 'Buyer', text: 'Is parking included?' }
      ]
    },

    // -----------------------------------------------------------------------
    // 2. Cork City - Modern Riverfront Apartment
    // -----------------------------------------------------------------------
    {
      id: 2,
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
    },

    // -----------------------------------------------------------------------
    // 3. Galway - Countryside Stone Cottage
    // -----------------------------------------------------------------------
    {
      id: 3,
      userInfo: {
        name: 'Siobhán Kelly - Property Consultant',
        profileImage: 'assets/img/woman.jpg',
        location: 'Galway, Ireland'
      },
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
      ],
      comments: [
        { user: 'Listing Info', text: '€295,000 • 3 Bed • 2 Bath • 160 m²' },
        { user: 'Location', text: 'Quiet rural setting near Connemara.' },
        { user: 'Buyer', text: 'Is fibre broadband available?' }
      ]
    },

    // -----------------------------------------------------------------------
    // 4. Drogheda - New Build Semi-Detached Home (YOUR TOWN)
    // -----------------------------------------------------------------------
    {
      id: 4,
      userInfo: {
        name: 'John McCabe - Drogheda Homes',
        profileImage: 'assets/img/man.jpg',
        location: 'Drogheda, Co. Louth'
      },
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1696266530873-30935fa5e549?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
      ],
      comments: [
        { user: 'Listing Info', text: '€350,000 • 3 Bed • 3 Bath • 140 m²' },
        { user: 'Location', text: 'Located near M1 retail park.' },
        { user: 'Buyer', text: 'When are viewing slots available?' }
      ]
    },

    // -----------------------------------------------------------------------
    // 5. Limerick - Riverside Apartment
    // -----------------------------------------------------------------------
    {
      id: 5,
      userInfo: {
        name: 'Cian O\'Sullivan - Estate Agent',
        profileImage: 'assets/img/man.jpg',
        location: 'Limerick, Ireland'
      },
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6' }
      ],
      comments: [
        { user: 'Listing Info', text: '€265,000 • 2 Bed • 2 Bath • 82 m²' },
        { user: 'Location', text: 'Near Shannon River, great views.' },
        { user: 'Buyer', text: 'Is there a balcony?' }
      ]
    },

    // -----------------------------------------------------------------------
    // 6. Waterford - Terraced Townhouse
    // -----------------------------------------------------------------------
    {
      id: 6,
      userInfo: {
        name: 'Aoife Byrne - Realtor',
        profileImage: 'assets/img/woman.jpg',
        location: 'Waterford, Ireland'
      },
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' }
      ],
      comments: [
        { user: 'Listing Info', text: '€230,000 • 3 Bed • 1 Bath • 112 m²' },
        { user: 'Location', text: 'Walking distance to Waterford City Centre.' },
        { user: 'Buyer', text: 'Does it qualify for First Home Scheme?' }
      ]
    },

    // -----------------------------------------------------------------------
    // 7. Dundalk - Modern Duplex Apartment
    // -----------------------------------------------------------------------
    {
      id: 7,
      userInfo: {
        name: 'Brian Nolan - Property Expert',
        profileImage: 'assets/img/man.jpg',
        location: 'Dundalk, Co. Louth'
      },
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1599423300746-b62533397364' }
      ],
      comments: [
        { user: 'Listing Info', text: '€280,000 • 2 Bed • 2 Bath • 95 m²' },
        { user: 'Location', text: 'Close to DKIT and retail centres.' },
        { user: 'Buyer', text: 'Is there a management fee?' }
      ]
    },

    // -----------------------------------------------------------------------
    // 8. Wicklow - Coastal Family Home
    // -----------------------------------------------------------------------
    {
      id: 8,
      userInfo: {
        name: 'Fiona Lyons - Estate Agent',
        profileImage: 'assets/img/woman.jpg',
        location: 'Wicklow, Ireland'
      },
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1762374974129-f9266d9c4efc?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
      ],
      comments: [
        { user: 'Listing Info', text: '€540,000 • 4 Bed • 3 Bath • 185 m²' },
        { user: 'Location', text: 'Seaside home with mountain views.' },
        { user: 'Buyer', text: 'Is the garden south-facing?' }
      ]
    },

    // -----------------------------------------------------------------------
    // 9. Wexford - Country Bungalow
    // -----------------------------------------------------------------------
    {
      id: 9,
      userInfo: {
        name: 'Shane Doyle - Property Advisor',
        profileImage: 'assets/img/man.jpg',
        location: 'Wexford, Ireland'
      },
      media: [
        { type: 'image', src: 'https://plus.unsplash.com/premium_photo-1757976211035-c0608558f5ec?q=80&w=1111&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
      ],
      comments: [
        { user: 'Listing Info', text: '€275,000 • 3 Bed • 2 Bath • 150 m²' },
        { user: 'Location', text: 'Quiet countryside location.' },
        { user: 'Buyer', text: 'How recent is the boiler system?' }
      ]
    },

    // -----------------------------------------------------------------------
    // 10. Navan - Suburban Detached Home
    // -----------------------------------------------------------------------
    {
      id: 10,
      userInfo: {
        name: 'Eileen McCormack - Realtor',
        profileImage: 'assets/img/woman.jpg',
        location: 'Navan, Co. Meath'
      },
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' }
      ],
      comments: [
        { user: 'Listing Info', text: '€420,000 • 4 Bed • 3 Bath • 175 m²' },
        { user: 'Location', text: 'Located near parks and schools.' },
        { user: 'Buyer', text: 'Any upcoming open house dates?' }
      ]
    }

  ];

  getAllPosts() {
    return this.data;
  }

  getPostById(id: number) {
    return this.data.filter((post: any) => post.id === id);
  }
}