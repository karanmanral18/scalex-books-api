import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { parse, unparse } from 'papaparse';
import { REQUEST } from '@nestjs/core';
import { RoleEnum } from '@/enum/role.enum';

const REGULAR_CSV_FILE_PATH: string = path.join(
  __dirname,
  '..',
  'book',
  'data',
  'regularUser.csv',
);

const ADMIN_CSV_FILE_PATH: string = path.join(
  __dirname,
  '..',
  'book',
  'data',
  'adminUser.csv',
);

@Injectable()
export class BookService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  /**
   * get all book records from csv
   */
  async getAllBooks() {
    try {
      const userRole = (this.request as any).user.role;
      const regularCsv = readFileSync(REGULAR_CSV_FILE_PATH, 'utf-8');
      const regularCsvData = parse(regularCsv, { header: true });
      if (userRole == RoleEnum.CUSTOMER) {
        return regularCsvData.data;
      } else {
        const adminCsv = readFileSync(ADMIN_CSV_FILE_PATH, 'utf-8');
        const adminCsvData = parse(adminCsv, { header: true });
        return [...regularCsvData.data, ...adminCsvData.data];
      }
    } catch (error) {
      throw new Error('Error reading records: ' + error.message);
    }
  }

  /**
   * add book to csv records
   */
  async addBook(bookDataDto: any) {
    try {
      const booksRecords = await this.getAllBooks();

      booksRecords.push({
        'Book Name': bookDataDto.book_name,
        Author: bookDataDto.author,
        'Publication Year': bookDataDto.publication_year,
      });

      const uniqueBooks = [];
      booksRecords.forEach((book) => {
        const bookName = book['Book Name'].toLowerCase();
        if (!uniqueBooks[bookName]) {
          uniqueBooks[bookName] = book;
        } else {
          console.warn(`Duplicate book found: ${bookName}`);
        }
      });
      const uniqueBooksArray = Object.values(uniqueBooks);

      const parsedCsvData = unparse(uniqueBooksArray, { header: true });
      writeFileSync(REGULAR_CSV_FILE_PATH, parsedCsvData);
      return { message: 'Book Created!', status: HttpStatus.CREATED };
    } catch (error) {
      throw new Error('Error adding record: ' + error.message);
    }
  }

  /**
   * delete book from csv records
   */
  async deleteBook(deleteBookDto: any) {
    try {
      const records = await this.getAllBooks();
      const bookNameToDelete = deleteBookDto.book_name.toLowerCase();

      const initialRecordCount = records.length;

      const updatedRecords = records.filter(
        (record) => record['Book Name'].toLowerCase() !== bookNameToDelete,
      );

      if (initialRecordCount === updatedRecords.length) {
        // Book not found, return a 404 response
        return {
          statusCode: 404,
          message: 'Book not found',
        };
      }
      const csvData = unparse(updatedRecords, { header: true });
      writeFileSync(REGULAR_CSV_FILE_PATH, csvData);
      return { message: 'Book Deleted!', status: HttpStatus.OK };
    } catch (error) {
      throw new Error('Error deleting record: ' + error.message);
    }
  }
}
