import { IsValidYear } from '@/custom-validations/isValidYear';
import { IsNotEmpty, IsString, Validate } from 'class-validator';

export class BookDataDto {
  @IsNotEmpty()
  @IsString()
  public book_name: string;

  @IsNotEmpty()
  @IsString()
  public author: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsValidYear)
  public publication_year: string;
}
