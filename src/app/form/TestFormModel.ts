import Checkbox from "../decorator/input/impl/CheckboxDecorator";
import Select from "../decorator/input/impl/SelectDecorator";
import Table from "../decorator/input/impl/TableDecorator";
import Text from "../decorator/input/impl/TextDecorator";
import Email from "../decorator/validator/impl/EmailValidatorDecorator";
import Length from "../decorator/validator/impl/LengthValidatorDecorator";
import MinLength from "../decorator/validator/impl/MinLengthValidatorDecorator";
import Pattern from "../decorator/validator/impl/PatternValidatorDecorator";
import Required from "../decorator/validator/impl/RequiredValidatorDecorator";
import URL from "../decorator/validator/impl/URLDecorator";
import Validator from "../decorator/validator/impl/ValidatorDecorator";
import { TextType } from "../model/TextType";
import TestFormModelChild from "./TestFormModelChild";

export default class TestFormModel {
  constructor() {
    
    let val1 = new TestFormModelChild({
      firstName: 'Bruno',
      middleName: 'Marijan',
      lastName: 'Tot',
      age: 23,
      birthCountry: 'Croatia',
      sex: 'M',
      isBot: true
    });

    let val2 = new TestFormModelChild({
      firstName: 'Ivan',
      middleName: 'Mateo',
      lastName: 'Miklec',
      age: 23,
      birthCountry: 'Croatia',
      sex: 'M',
      isBot: false
    })

    let val3 = new TestFormModelChild({
      firstName: 'Marin',
      middleName: 'Nonbinary',
      lastName: 'Sopjanac',
      age: 23,
      birthCountry: 'Croatia',
      sex: 'F',
      isBot: true
    })
    this.manyData = [];
    this.manyData.push(val1);
    this.manyData.push(val2);
    this.manyData.push(val3);
  }

  @Required()
  @Email()
  @Text({label: 'Email'})
  email!: string;

  @Required()
  @Text({label: 'Username'})
  username!: string;

  @Required()
  @MinLength({minLength: 5})
  @Text({label: 'Password', type: TextType.PASSWORD})
  password!: string;

  @Validator({
    message: 'Passwords must match',
    isValid: (value: string, _this: TestFormModel) => _this.password === value
  })
  @Text({label: 'Confirm password', type: TextType.PASSWORD})
  confirmPassword!: string;

  @Text({label: 'Portfolio website'})
  @URL()
  portfolioUrl!: string;

  @Text({label: 'Age', type: TextType.NUMBER})
  @Validator({
    message: 'You must be 18 or older',
    isValid: (value: number) => value >= 18
  })
  age!: number;

  @Select({
    label: 'Gender',
    itemsOrObservable: [
      {id: 'M', text: 'Male'},
      {id: 'F', text: 'Female'},
      {id: 'O', text: 'Other'}
    ]
  })
  @Required()
  gender!: string;

  @Required()
  @Checkbox({label: 'Verify you are human'})
  isHuman!: boolean;

  @Table({
    label: 'Employee list',
    model: new TestFormModelChild()
  })
  manyData: TestFormModelChild[];
}