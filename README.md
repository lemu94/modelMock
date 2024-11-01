# ModelMock - Mock Data Generator

**ModelMock** is a generic class designed to generate mock data based on a provided data model. It uses JSON files containing names, addresses, cities, streets, and credit card numbers to populate the model fields, creating realistic datasets for testing and prototyping.

## Features

- **Realistic Data Injection** : ModelMock loads data from JSON files, including names, addresses, cities, streets, etc.
- **Random generation** : Creates random values ​​for different data types (`string`, `number`, `boolean`, `Date`).
- **Flexible and extensible** :Compatible with any data model.

## Prerequisites

To use **ModelMock** you need to make sure:

**HttpClient** is configured in your Angular application. You can add it in your `app.module.ts` or `app.config.ts` file (in standalone mode).


Make sure you have placed the following JSON files in your application's `assets/data` folder:

- `firstname.json` - Contains people's names
- `address.json` - Contains addresses
- `city.json` - Contains cities
- `street.json` - Contains street names
- `creditcard.json` - Contains fictitious credit card numbers

You can download these files from [our Git repository](https://github.com/lemu94/modelMock/tree/master/projects/model-mock/src/data) and place them in `assets/data` of your project.

## Installation

1. Install the library in your Angular project:

   ```bash
   npm install model-mock

To use the **ModelMock** class, follow these steps:

2. **Create a data model** - Define a data model that will represent the structure of your object. For example:


   ```typescript
   interface UserModel {
     name: string;
     age: number;
     address: string;
     city: string;
     street: string;
     credit_card: string;
   }
   ```
3. **Initialize a ModelMock instance**
Create an instance of the ModelMock class by passing it the model data, then retrieve mock data by calling the get method:

```typescript
import { ModelMock } from "model-mock";

// Example of an empty user model
const userData: UserModel = {
  name: "",
  age: 0,
  address: "",
  city: "",
  street: "",
  credit_card: ""
};

// Create an instance of ModelMock
const mock = new ModelMock<UserModel>(userData);

// Retrieve the dummy data
const mockData = mock.dataList;
console.log(mockData);
```
## Possible uses

**ModelMock** can be used for:

- **Test user interfaces**: Generates realistic data, allowing to test interfaces without depending on a database.

- **Automated Test Report Generation**: Creates varied scenarios to validate test cases.
- **Rapid Prototyping**: Provides consistent data for demonstrations and early development phases.

## Main methods

- **`createRandomString(key: string)`** : Generates a realistic string based on the field type (name, address, city, etc.).
- **`createRandomDate()`** : Creates a random date between the year 2000 and the current date.
- **`createListData(count: number)`** : Generates an array of dummy data items based on the provided data model.
