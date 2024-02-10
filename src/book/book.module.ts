import { Module } from '@nestjs/common';
import { BookController } from './controllers/BookController';
import { BookService } from './book.service';

@Module({
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
