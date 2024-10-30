// cart.model.ts

import { Injectable } from "@angular/core";
import { Product } from "./reserve.model";

@Injectable()
export class Cart {
    public lines: CartLine[] = [];
    public itemCount: number = 0;
    public cartPrice: number = 0;

    // Method to add a product line to the cart
    addLine(product: Product, quantity: number = 1, selectedTimeSlot?: string, selectedDate?: string) {
        let line = this.lines.find(line => line.product.id === product.id);
        if (line) {
            line.quantity += quantity; // If the product already exists, just update the quantity
        } else {
            // Create a new CartLine with the product details
            this.lines.push(new CartLine(product, quantity, selectedTimeSlot, selectedDate));
        }
        this.recalculate(); // Update total count and price
    }

    updateQuantity(product: Product, quantity: number) {
        let line = this.lines.find(line => line.product.id === product.id);
        if (line) {
            line.quantity = Number(quantity); // Update quantity for the product line
        }
        this.recalculate(); // Recalculate totals
    }

    removeLine(id: number) {
        let index = this.lines.findIndex(line => line.product.id === id);
        if (index !== -1) {
            this.lines.splice(index, 1); // Remove the line item
        }
        this.recalculate(); // Recalculate totals
    }

    clear() {
        this.lines = [];
        this.itemCount = 0;
        this.cartPrice = 0; // Clear the cart
    }

    private recalculate() {
        this.itemCount = 0;
        this.cartPrice = 0;
        this.lines.forEach(line => {
            this.itemCount += line.quantity; // Count total items
            this.cartPrice += line.lineTotal; // Calculate total price
        });
    }
}

// CartLine class definition
export class CartLine {
    constructor(
        public product: Product,
        public quantity: number,
        public selectedTimeSlot?: string, // New property for time slot
        public selectedDate?: string // New property for date
    ) {}

    get lineTotal() {
        return this.quantity * (this.product.price ?? 0); // Calculate line total
    }
}
