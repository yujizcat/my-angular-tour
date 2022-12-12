
export class CityModel {
    constructor(
    public name: string,
    public population: number,
    public country: string,
    public weather: string,
    public temperature: number,
    public id?: number,
    ){
        this.name = name;
        this.population = population;
        this.country = country;
        this.id = id;
    }

}