import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteBookDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Book Name',
    example: 'Harry Potter',
  })
  public book_name: string;
}
