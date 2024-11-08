import { TestBed } from '@angular/core/testing';
import { ModelMock } from './model-mock'; 

interface SampleDataModel {
  firstName: string;
  lastName: string;
  age: number;
  email : string;
  sexe : string
}

describe('ModelMock', () => {
  let service: ModelMock<SampleDataModel>;
   const sampleModel: SampleDataModel = {
    firstName: '',
    lastName: '',
    age: 0,
    email : "",
    sexe : ""
  };
  beforeEach(() => {
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
  it('should generate number for age',()=>{
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
  it('should generate string with @ for email', () => {
    expect(service.dataList[0].email.includes("@")).toBeTrue();
  });

  it('should generate "f" or "m"  for sex', () => {
    expect(["f","m"].includes(service.dataList[0].sexe)).toBeTrue();
  });

});
