// StoreComponent.ts
import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";
import { Cart } from "../model/cart.model";
import { Router } from "@angular/router";

@Component({
    selector: "store",
    templateUrl: "store.component.html"
    
})
export class StoreComponent {
    selectedCategory: string | undefined;
    timeSlots: string[] = [];
    today: string;

    constructor(
        private repository: ProductRepository,
        private cart: Cart,
        private router: Router
    ) {
        this.createTimeSlots();
        this.today = new Date().toISOString().split('T')[0]; // Set today's date in YYYY-MM-DD format
    }

    createTimeSlots() {
        const startHour = 9; // 9:00 AM
        const endHour = 18; // 6:00 PM
        const slotDuration = 3; // Duration of each time slot in hours

        for (let hour = startHour; hour < endHour; hour += slotDuration) {
            const start = `${hour}:00`;
            const end = `${hour + slotDuration}:00`;
            this.timeSlots.push(`${start} - ${end}`);
        }
    }

    get products(): Product[] {
        return this.repository.getProducts(this.selectedCategory);
    }

    changeCategory(newCategory?: string) {
        this.selectedCategory = newCategory;
    }

    addProductToCart(product: Product) {
        const quantity = product.quantity && product.quantity > 0 ? product.quantity : 1;
        const selectedTimeSlot = product.selectedTimeSlot;
        const selectedDate = product.selectedDate;

        this.cart.addLine(product, quantity, selectedTimeSlot, selectedDate); // Pass the selected date and time slot to the cart

    }

    goToCart() {
        this.router.navigate(['/cart']);
    }
}
