import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidYear', async: false })
export class IsValidYear implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const regex = /^\d{4}$/;
    return regex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'publication_year must be a valid year in the format YYYY';
  }
}
