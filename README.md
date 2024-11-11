# ModelMock - Mock Data Generator

**ModelMock** is a generic class designed to generate mock data based on a provided data model. It uses data containing names, addresses, cities, streets, job, colors,email , credit card numbers and others to populate the model fields, creating realistic datasets for testing and prototyping.

## Features

- **Realistic Data Injection** : ModelMock loads data from JSON files, including names, addresses, cities, streets, etc.
- **Random generation** : Creates random values ​​for different data types (`string`, `number`, `boolean`, `Date`).
- **Flexible and extensible** :Compatible with any data model.




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

- **`dataList`** : Retrieves a  array of generated mock data.
- **`dataListReadOnly`** : Retrieves a readonly array of generated mock data..
- **`getKeys`** : Generates an array of keys from the data model.
