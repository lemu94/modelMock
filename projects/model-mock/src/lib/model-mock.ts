import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { forkJoin } from "rxjs";

/**
 * A generic class for generating mock data based on a provided data model.
 * It fetches realistic names, addresses, cities, and streets from JSON files 
 * and uses them to populate fields in the data model.
 *
 * @template T - The type of the data model.
 */
export class ModelMock<T extends Record<string, any>> {
    protected dataModel: T; // The base data model to generate mock data from
    private names: string[] = []; // Array to store names fetched from JSON
    private streets: string[] = []; // Array to store streets fetched from JSON
    private address: string[] = []; // Array to store addresses fetched from JSON
    private cities : string[] = []; // Predefined array of cities
    private sex : string[]=['f','m'];
    private credit_card : string[]=[];

    http = inject(HttpClient); // Injecting HttpClient for HTTP requests

    /**
     * Creates an instance of ModelMock.
     * 
     * @param dataModel - The initial data model to use for generating mock data.
     */
    constructor(dataModel: T) {
        this.dataModel = dataModel;
        this.loadData(); // Load data from JSON files
    }

    /**
     * Loads data from JSON files into the class properties.
     * Utilizes forkJoin to handle multiple HTTP requests concurrently.
     */
    private loadData() {
        forkJoin({
            names: this.http.get<string[]>('assets/data/firstname.json'),
            address: this.http.get<string[]>('assets/data/adress.json'),
            cities: this.http.get<string[]>('assets/data/city.json'),
            streets: this.http.get<string[]>('assets/data/street.json'), 
            credit_card : this.http.get<string[]>('assets/data/creditcard.json'), 
        }).subscribe({
            next :(data)=>{
                    this.names = data.names;
                    this.cities = data.cities;
                    this.address = data.address;
                    this.streets = data.streets;
                    this.credit_card=data.credit_card;
                
            },
            error :(error)=>{

                if (error.status === 404) {
                    console.error('Error 404: file(s) not found. Please place the json files in the assets folder and in subfolder "Data" ! ', error);
                } else {
                    console.error('Error while loading Data', error);
                }
            }
        });
    }

    /**
     * Retrieves a readonly array of generated mock data.
     * 
     * @returns ReadonlyArray<T> - An array of generated mock data based on the data model.
     */
    get get(): ReadonlyArray<T> {
        return this.createListData();
    }

    /**
     * Gets the keys of the data model.
     * 
     * @returns Array<keyof T> - An array of keys from the data model.
     */
    getKeys(): Array<keyof T> {
        return Object.keys(this.dataModel as T) as Array<keyof T>;
    }

    /**
     * Generates a random date between the year 2000 and the current date.
     * 
     * @returns Date - A randomly generated date.
     */
    protected createRandomDate(): Date {
        const start = new Date(2000, 0, 1).getTime();
        const end = new Date().getTime();
        return new Date(start + Math.random() * (end - start));
    }

    /**
     * Generates a random number between the specified minimum and maximum values.
     * @param key -The key to determine the type of random string to generate
     * @param min - The minimum value (inclusive).
     * @param max - The maximum value (inclusive).
     * @returns number - A randomly generated number.
     */
    protected createNumberRand(key : string,min: number = 0, max: number = 100000): number {
        
        if(key.toLowerCase().includes('age')){
            max=99;
            min=10;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Retrieves a random string from the provided array.
     * 
     * @param array - An array of strings to choose from.
     * @returns string - A randomly selected string from the array.
     */
    protected getRandomFromArray(array: string[]): string {
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * Creates a random string based on the key provided.
     * It generates realistic values for names, addresses, cities, etc.
     * 
     * @param key - The key to determine the type of random string to generate.
     * @returns string - A randomly generated string based on the key.
     */
    protected createRandomString(key: string): string {
        if (key.toLowerCase().includes("first") || 
            key.toLowerCase().includes("name")  || 
            key.toLowerCase().includes("nom")) {
            return this.getRandomFromArray(this.names);
        } else 
        if (key.toLowerCase().includes("last") || 
                   key.toLowerCase().includes("surname") || 
                  key.toLowerCase().includes("prenom")) {
            return this.getRandomFromArray(this.names);
        } else 
        if (key.toLowerCase().includes("street")) {
            return `${this.getRandomFromArray(this.streets)}`;
        } else 
        if (key.toLowerCase().includes("address") || key.toLowerCase().includes("adress")) {
            return `${this.getRandomFromArray(this.address)}`;
        } else 
        if (key.toLowerCase().includes("city") || key.toLowerCase().includes("ville")) {
            return this.getRandomFromArray(this.cities);
        }
        if (key.toLowerCase().includes("sex") ) {
            return  this.getRandomFromArray(this.sex);
        }
        if (key.toLowerCase().includes("credi") ) {
            return this.getRandomFromArray(this.credit_card);
        }
        if (key.toLowerCase().includes("card") ) {
            return this.getRandomFromArray(this.credit_card);
        }
        return `RandomData${this.createNumberRand(key,1, 100)}`;
    }

    /**
     * Creates a list of mock data items based on the data model.
     * 
     * @param count - The number of mock data items to generate (default is 5).
     * @returns T[] - An array of generated mock data items.
     */
    protected createListData(count: number = 5): T[] {
        const dataList: T[] = [];

        for (let i = 0; i < count; i++) {
            const item = { ...this.dataModel } as T;

            for (const key in item) {
                const fieldType = typeof (item as any)[key];
                if (fieldType === "number") {
                    (item as any)[key] =this.createNumberRand(key);
                } else if (fieldType === "string") {
                    (item as any)[key] = this.createRandomString(key);
                } else if (fieldType === "boolean") {
                    (item as any)[key] = Math.random() < 0.5;
                } else if ((item as any)[key] instanceof Date) {
                    (item as any)[key] = this.createRandomDate();
                }
            }

            dataList.push(item);
        }

        return dataList;
    }
}
