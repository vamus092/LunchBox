import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Add this just in case
import { Restaurant } from '../model/restaurantModel';

@Component({
  selector: 'app-deals',
  standalone: true, // Ensure this is true for modern Angular
  imports: [CommonModule], // Resolves NG8103
  templateUrl: './deals.html',
  styleUrls: ['./deals.css']
})
export class DealsComponent {
  categories: string[] = ['Vegan', 'Sushi', 'Pizza & Fast food', 'others'];
  selectedCategory: string = 'Pizza & Fast food';

  allRestaurants: Restaurant[] = [
    { name: 'Chef Burgers London', discount: '-40%', image: 'assets/h1.avif', category: 'Pizza & Fast food' },
    { name: 'Grand Ai Cafe London', discount: '-20%', image: 'assets/h9.avif', category: 'Vegan' },
    { name: 'Butterbrot Caf\'e London', discount: '-17%', image: 'assets/h2.avif', category: 'Pizza & Fast food' },
        { name: 'Vibe & Veggie London', discount: '-17%', image: 'assets/h3.avif', category: 'Pizza & Fast food' },

              { name: ' London', discount: '-17%', image: 'assets/h4.avif', category: 'Vegan' },

                { name: 'Butterbrot Caf\'e London', discount: '-17%', image: 'assets/h5.avif', category: 'Vegan' },

                    { name: 'Rolling Wasabi', discount: '-17%', image: 'assets/h6.avif', category: 'Sushi' },

                        { name: 'Crust & Co.', discount: '-17%', image: 'assets/h8.avif', category: 'Sushi' },

                            { name: 'Butterbrot Caf\'e London', discount: '-17%', image: 'assets/h7.avif', category: 'Sushi' }

    
  ];

  get filteredRestaurants() {
    return this.allRestaurants.filter(res => res.category === this.selectedCategory);
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
  }
}