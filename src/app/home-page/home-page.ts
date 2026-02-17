import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MenuService } from '../services/menu-service';
import { MenuSection } from '../model/menuSection';
import { Restaurant} from '../model/restaurantModel';  
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserModel } from '../model/UserModel';
import { UserService } from '../services/user-service';
import { DealsComponent } from '../deals/deals';
import {Promo} from '../promo/promo';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,DealsComponent,Promo],
  templateUrl:'./home-page.html',
  styleUrl:'./home-page.css',
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {

  menuSections!: MenuSection[];
  currentUser!: UserModel | null;
  subscription: any;







  
  // ... existing properties ...

  // --- NEW INFO SECTION PROPERTIES ---
  // Controls which tab is currently active ('faq' is default)
  selectedInfoTab: string = 'faq';

  // Data for the FAQ section
  faqQuestions = [
    { 
      question: 'How does Order.UK work?', 
      answer: 'Order.UK simplifies the food ordering process. Browse through our diverse menu, select your favorite dishes, and proceed to checkout. Your delicious meal will be on its way to your doorstep in no time!' 
    },
    { 
      question: 'What payment methods are accepted?', 
      answer: 'We accept all major credit and debit cards (Visa, MasterCard, Amex), PayPal, and Apple Pay. Cash on delivery is also available in select locations.' 
    },
    { 
      question: 'Can I track my order in real-time?', 
      answer: 'Yes, absolutely! Once your order is confirmed, you can track its status from preparation to delivery in real-time through our website or mobile app.' 
    },
    { 
      question: 'Are there any special discounts or promotions?', 
      answer: 'We frequently run special promotions and offer exclusive discounts to our users. Keep an eye on our "Special Offers" page and subscribe to our newsletter so you never miss out!' 
    }
    // },
    // { 
    //   question: 'Is Order.UK available in my area?', 
    //   answer: 'Enter your postcode on our homepage to check if we deliver to your area. We are constantly expanding our delivery zones to bring great food to more people.' 
    // }
  ];

  // Controls which FAQ answer is currently showing
  selectedFaq = this.faqQuestions[0];












  // --- STATS PROPERTIES ---
  readonly targetRiders = 150;//registered rider
  readonly targetOrders = 2000;//food delivered
  readonly targetRestaurants = 85;//restraunts partnered
  readonly targetItems = 200;//food items



  displayedRiders = 0;
  displayedOrders = 0;
  displayedRestaurants = 0;
  displayedItems = 0;

  private hasAnimated = false;

  @ViewChild('statsSection', { static: false }) statsSection!: ElementRef;

  constructor(
    private userService: UserService,
    private menuService: MenuService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.menuSections = this.menuService.getMenu();
    this.subscription = this.userService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngAfterViewInit() {
    if (!this.statsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.startCounting();
          this.hasAnimated = true;
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.statsSection.nativeElement);
  }





  startCounting() {
    const duration = 2000;
    const steps = 80;
    const intervalTime = duration / steps;

    this.animateValue(this.targetRiders, (val) => this.displayedRiders = val, intervalTime, steps);
    this.animateValue(this.targetOrders, (val) => this.displayedOrders = val, intervalTime, steps);
    this.animateValue(this.targetRestaurants, (val) => this.displayedRestaurants = val, intervalTime, steps);
    this.animateValue(this.targetItems, (val) => this.displayedItems = val, intervalTime, steps);
  }

  animateValue(target: number, setter: (val: number) => void, intervalTime: number, steps: number) {
    let current = 0;
    const increment = target / steps;
    
    const timer = setInterval(() => {
      current += increment;
      
      if (current >= target) {
        setter(target);
        clearInterval(timer);
      } else {
        setter(Math.floor(current));
      }

      
      this.cdr.detectChanges(); 

    }, intervalTime);
  }

  navigateToSection(sectionName: string) {
    this.router.navigate(['/section-items', sectionName]);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}