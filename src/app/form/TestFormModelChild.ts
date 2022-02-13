import Checkbox from "../decorator/input/impl/CheckboxDecorator";
import Select from "../decorator/input/impl/SelectDecorator";
import Text from "../decorator/input/impl/TextDecorator";
import Required from "../decorator/validator/impl/RequiredValidatorDecorator";
import { TextType } from "../model/TextType";

export default class TestFormModelChild {
  constructor(value?: TestFormModelChild) {
    this.firstName = value?.firstName || null as any;
    this.middleName = value?.middleName || null as any;
    this.lastName = value?.lastName || null as any;
    this.birthCountry = value?.birthCountry || null as any;
    this.age = value?.age || null as any;
    this.sex = value?.sex || null as any;
    this.isBot = value?.isBot || null as any;
  }

  @Text({label: 'First name'})
  firstName!: string;

  @Text({label: 'Middle name'})
  middleName!: string;

  @Text({label: 'Last name'})
  lastName!: string;

  @Text({label: 'Birth country'})
  birthCountry!: string;

  @Text({label: 'Age', type: TextType.NUMBER})
  @Required()
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
  sex!: string;

  @Checkbox({label: 'Bot test 123 :)'})
  isBot!: boolean;
}
