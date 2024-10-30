// modelMock.d.ts

declare module 'modelMock' {
    /**
     * A generic class for generating mock data based on a provided data model.
     * @template T - The type of the data model.
     */
    export class ModelMock<T extends Record<string, any>> {
        /**
         * Creates an instance of ModelMock.
         * @param {T} dataModel - The initial data model to use for generating mock data.
         * @param {number} [count=5] - The number of mock data items to generate by default
         */
        constructor(dataModel: T,count : number);

        /**
         * Retrieves a readonly array of generated mock data.
         * @returns ReadonlyArray<T> - An array of generated mock data based on the data model.
         */
        get dataList(): ReadonlyArray<T>;

        /**
         * Gets the keys of the data model.
         * @returns Array<keyof T> - An array of keys from the data model.
         */
        getKeys(): Array<keyof T>;

        /**
         * Generates a random date between the year 2000 and the current date.
         * @returns Date - A randomly generated date.
         */
        protected createRandomDate(): Date;

        /**
         * Generates a random number between the specified minimum and maximum values.
         * @param min - The minimum value (inclusive).
         * @param max - The maximum value (inclusive).
         * @returns number - A randomly generated number.
         */
        protected createNumberRand(min?: number, max?: number): number;

        /**
         * Retrieves a random string from the provided array.
         * @param array - An array of strings to choose from.
         * @returns string - A randomly selected string from the array.
         */
        protected getRandomFromArray(array: string[]): string;

        /**
         * Creates a random string based on the key provided.
         * @param key - The key to determine the type of random string to generate.
         * @returns string - A randomly generated string based on the key.
         */
        protected createRandomString(key: string): string;

        /**
         * Creates a list of mock data items based on the data model.
         * @param count - The number of mock data items to generate (default is 5).
         * @returns T[] - An array of generated mock data items.
         */
        protected createListData(count?: number): T[];
    }
}
