import { TestBed } from '@angular/core/testing';
import { ModelMock } from './model-mock'; // Adjust the import path as necessary

// Sample data model interface
interface SampleDataModel {
  firstName: string;
  lastName: string;
  age: number;
}

describe('ModelMock', () => {
  let service: ModelMock<SampleDataModel>;

  beforeEach(() => {
    // Initialize TestBed if you need Angular testing utilities; otherwise, you can skip this.
    TestBed.configureTestingModule({});
    
    // Create an instance of ModelMock with a sample data model
    const sampleModel: SampleDataModel = {
      firstName: '',
      lastName: '',
      age: 0,
    };
    service = new ModelMock<SampleDataModel>(sampleModel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // You can add more tests below to verify functionality
});
