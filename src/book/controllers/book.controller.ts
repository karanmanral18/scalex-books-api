import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BookService } from '../book.service';
import { BookDataDto } from '@/dtos/bookDataDto';
import { DeleteBookDto } from '@/dtos/deleteBookDto';
import { Roles } from '@/decorators/roles';
import { RoleEnum } from '@/enum/role.enum';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@/auth/guards/role/role.guard';

@Controller('')
export class BookController {
  constructor(private bookService: BookService) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.CUSTOMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('home')
  async getBooks() {
    return await this.bookService.getAllBooks();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('addBook')
  async addBook(@Body(new ValidationPipe()) bookDataDto: BookDataDto) {
    return await this.bookService.addBook(bookDataDto);
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('deleteBook')
  async deleteBook(@Body(new ValidationPipe()) deleteBookDto: DeleteBookDto) {
    return await this.bookService.deleteBook(deleteBookDto);
  }
}
