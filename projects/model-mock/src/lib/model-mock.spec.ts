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
   // Create an instance of ModelMock with a sample data model
   const sampleModel: SampleDataModel = {
    firstName: '',
    lastName: '',
    age: 0,
  };
  beforeEach(() => {
    // Initialize TestBed if you need Angular testing utilities; otherwise, you can skip this.
    TestBed.configureTestingModule({});
    
 
    service = new ModelMock<SampleDataModel>(sampleModel,10);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate 10 lignes aleatoires',()=>{
      expect(service.dataList.length).toEqual(10);
  })
  it('should generate string for firstName',()=>{
      expect(typeof service.dataList[0].firstName).toBe("string");
  })
  it('should generate string for lastName',()=>{
    expect(typeof service.dataList[0].lastName).toBe("string");
  })
  it('should generate string for age',()=>{
    expect(typeof service.dataList[0].age).toBe("number");
  })
  it('should be generate zero data',()=>{
    const emptyData = new ModelMock<SampleDataModel>(sampleModel,0);
    expect(emptyData.dataList.length).toEqual(0);
  })
  it('should generate non-undefined strings for firstName and lastName', () => {
    expect(service.dataList[0].firstName).not.toBe("");
    expect(service.dataList[0].lastName).not.toBe('');
  });

});
