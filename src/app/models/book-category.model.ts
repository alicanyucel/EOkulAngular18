import { CategoryModel } from "./category.model";

export class BookCategoryModel{
    id: string = "";
    bookId: string = "";
    categoryId: string = "";
    category: CategoryModel = new CategoryModel();
}