import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteBookDto {
  @IsNotEmpty()
  @IsString()
  public book_name: string;
}
