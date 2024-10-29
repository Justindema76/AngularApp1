export class Product {
quantity: any;
selectedTimeSlot: any;
selectedDate: any;

    constructor(
        public id?: number,
        public name?: string,
        public category?: string,
        public description?: string,
        public price?: number) { }
}
