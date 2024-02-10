import { IsValidYear } from '@/custom-validations/isValidYear';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';

export class BookDataDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Book Name',
    example: 'Harry Potter',
  })
  public book_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Author of the book',
    example: 'JK Rowling',
  })
  public author: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsValidYear)
  @ApiProperty({
    description: 'Year of publication',
    example: '2022',
  })
  public publication_year: string;
}
