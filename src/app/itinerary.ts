export class Itinerary{
    constructor(
        public city: string,
        public date: string,
        public cost: number,
    )
        
    {
        this.city = city;
        this.date = date;
        this.cost = cost;
    }
}