import { BookCategoryModel } from "./book-category.model";
import { BookImageModel } from "./book-image.model";

export class BookModel{
    id: string = "";
    title: string = "";
    summary: string = "";
    author: string  ="";
    isbn: string = "";
    bookImages: BookImageModel[] = [];
    bookImageNames: string[] = [];
    coverImage: string = "";
    bookCategories: BookCategoryModel[] = []; 
    categoryNames: string[] = [];   
}