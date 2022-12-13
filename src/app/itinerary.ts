export class Itinerary{
    constructor(
        public id: number,
        public city: string,
        public date: string,
        public cost: number,
    )
        
    {
        this.id = id;
        this.city = city;
        this.date = date;
        this.cost = cost;
    }
}