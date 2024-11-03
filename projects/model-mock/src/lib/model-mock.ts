import { inject } from "@angular/core";
import { mockData } from "./mock-data";

/**
 * A generic class for generating mock data based on a provided data model.
 * It fetches realistic names, addresses, cities, and streets from JSON files 
 * and uses them to populate fields in the data model.
 *
 * @template T - The type of the data model.
 */
export class ModelMock<T extends Record<string, any>> {
    protected dataModel: T; // The base data model to generate mock data from
    protected count : number=0;
    private names: string[] =  mockData.names; // Array to store names fetched from JSON
    private streets: string[] = mockData.streets; // Array to store streets fetched from JSON
    private address: string[] = mockData.address; // Array to store addresses fetched from JSON
    private cities : string[] = mockData.cities; // Predefined array of cities
    private code_colors : string []= mockData.code_color;
    private job : string []=mockData.job;
    private sex : string[]=['f','m'];
    private credit_card : string[]=mockData.credit_card;


    /**
     * Creates an instance of ModelMock.
     * 
     * @param {T} dataModel - The initial data model to use for generating mock data.
     * @param {number} [count=5] - The number of mock data items to generate by default
     */
    constructor(dataModel: T, count : number =5) {
        this.dataModel = dataModel;
        this.count = count;
    }

    

    /**
     * Retrieves a  array of generated mock data.
     * 
     * @returns {Array<T>} - An array of generated mock data based on the data model.
     * @example
     * new ModelMock(new Person(),50).dataList;
     */
    get dataList(): Array<T> {
        return this.createListData(this.count);
    }

    
    /**
     * Retrieves a readonly array of generated mock data.
     * 
     * @returns {ReadonlyArray<T>} - An array of generated mock data based on the data model.
     * @example
     * new ModelMock(new Person(),50).dataListReadOnly;
     */
    get dataListReadOnly(): ReadonlyArray<T> {
        return this.createListData(this.count);
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
     * @returns {Date} - A randomly generated date.
     */
    protected createRandomDate(): Date {
        const start = new Date(2000, 0, 1).getTime();
        const end = new Date().getTime();
        return new Date(start + Math.random() * (end - start));
    }

    /**
     * Generates a random number between the specified minimum and maximum values.
     * @param {string} key -The key to determine the type of random string to generate
     * @param {number} min - The minimum value (inclusive).
     * @param {number} max - The maximum value (inclusive).
     * @returns {number} - A randomly generated number.
     */
    protected createNumberRand(key : string,min: number = 0, max: number = 100000): number {
        
        if(key.toLowerCase().includes('age')){
            max=99;
            min=10;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        if(key.toLowerCase().includes('year')){
            max=2024;
            min=1950;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    protected createRandomEmail(names : string=""): string {
        const domains = ['example.com', 'test.com', 'demo.com'];
        let name = (names==="")? this.getRandomFromArray(this.names): names;
            name = name.toLowerCase().replace(/\s+/g, '');
        const domain = this.getRandomFromArray(domains);
        return `${name}@${domain}`;
    }

    /**
     * Retrieves a random string from the provided array.
     * 
     * @param {string[]} array - An array of strings to choose from.
     * @returns {string} - A randomly selected string from the array.
     */
    protected getRandomFromArray(array: string[]): string  {
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * Creates a random string based on the key provided.
     * It generates realistic values for names, addresses, cities, etc.
     * 
     * @param {string} key - The key to determine the type of random string to generate.
     * @returns {string} - A randomly generated string based on the key.
     */
    protected createRandomString(key: string): string {
        if (key.toLowerCase().includes("first") || 
            key.toLowerCase().includes("name")  || 
            key.toLowerCase().includes("nom")) {
            return this.getRandomFromArray(this.names) ;
        } else 
        if (key.toLowerCase().includes("last")    || 
            key.toLowerCase().includes("surname") || 
            key.toLowerCase().includes("prenom")) {
            return this.getRandomFromArray(this.names);
        } else 
        if (key.toLowerCase().includes("street") || key.toLowerCase().includes("rue")) {
            return `${this.getRandomFromArray(this.streets)}`;
        } else 
        if (key.toLowerCase().includes("address") || key.toLowerCase().includes("adress")) {
            return `${this.getRandomFromArray(this.address)}`;
        } else 
        if (key.toLowerCase().includes("city")   || key.toLowerCase().includes("vill") ||
            key.toLowerCase().includes("cities") || key.toLowerCase().includes("ville")) {
            return this.getRandomFromArray(this.cities) ;
        }
        if (key.toLowerCase().includes("sex") ) {
            return  this.getRandomFromArray(this.sex);
        }
        if (key.toLowerCase().includes("credi") || key.toLowerCase().includes("card") ) {
            return this.getRandomFromArray(this.credit_card);
        }
        if (key.toLowerCase().includes("color") || key.toLowerCase().includes("couleur")  ) {
            return this.getRandomFromArray(this.code_colors);
        }
        if (key.toLowerCase().includes("job") || key.toLowerCase().includes("emploi") ||
            key.toLowerCase().includes("taf") ||  key.toLowerCase().includes("occupation") ) {
            return this.getRandomFromArray(this.job);
        }
        if (key.toLowerCase().includes("email") || key.toLowerCase().includes("courriel")) {
            return this.createRandomEmail();
         }
        return `RandomData${this.createNumberRand(key,1, 100)}`;
    }

    /**
     * Creates a list of mock data items based on the data model.
     * 
     * @param {number} count - The number of mock data items to generate (default is 5).
     * @returns {T[]} - An array of generated mock data items.
     */
    protected createListData(count:number): T[] {
        const dataList: T[] = [];

        for (let i = 0; i < count; i++) {
            const item = { ...this.dataModel } as T;

            for (const key in item) {
                const fieldType = typeof item[key];
                if (fieldType === "number") {
                    (item[key] as number) =this.createNumberRand(key);
                } else if (fieldType === "string") {
                    (item[key] as string) = this.createRandomString(key);
                } else if (fieldType === "boolean") {
                    (item[key] as boolean) = Math.random() < 0.5;
                } else if ((item as any)[key] instanceof Date) {
                    (item[key] as Date) = this.createRandomDate();
                }
            }

            dataList.push(item);
        }

        return dataList;
    }
}
