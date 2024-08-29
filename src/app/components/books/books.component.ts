import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { BreadCrumbModel } from '../blank/blank.component';
import { BookModel } from '../../models/book.model';
import { HttpService } from '../../services/http.service';
import { fileUrl } from '../../constants';
import { FlexiToastService } from 'flexi-toast';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export default class BooksComponent implements OnInit {
  breadCrumbs = signal<BreadCrumbModel[]>([
    {
      name: "Ana Sayfa",
      class: "",
      route: "/admin"
    },
    {
      name: "Kitaplar",
      class: "active",
      route: "/admin/books"
    }
  ]);
  books = signal<BookModel[]>([]);
  fileUrl = fileUrl + /book-images/;
  selectedBook = signal<BookModel>(new BookModel());
  selectedBookCoverImage = signal<string>("");

  @ViewChild("bookImagesModalCloseBtn") bookImagesModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private http: HttpService,
    private toast: FlexiToastService
  ){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.http.get<BookModel[]>("Books/GetAll",(res)=> {
      this.books.set(res);
    });
  }

  setSelectedBook(item:BookModel){
    this.selectedBook.set({...item});
    this.selectedBookCoverImage.set(item.coverImage);
  }

  changeCoverImage(){
    const data = {
      bookId: this.selectedBook().id,
      imageUrl: this.selectedBook().coverImage
    };

    this.http.post<string>("Books/ChangeCoverImage",data,(res)=> {
      this.toast.showToast("Bilgilendirme",res,"info");
      this.getAll();

      //this.bookImagesModalCloseBtn!.nativeElement.click();
    });
  }

  addNewImages(event:any){
    const files = event.target.files;
    const formData = new FormData();

    formData.append("bookId", this.selectedBook().id);

    for(const file of files){
      formData.append("files", file, file.name);
    }

    this.http.post<string[]>("Books/AddNewImages", formData,(res)=> {
      this.selectedBook().bookImageNames.push(...res);
      event.target.files = [];
      this.toast.showToast("Bilgilendirme","Yeni resimler başarıyla eklendi","info");
    });

  }

  removeImage(image: string, index: number){
    this.toast.showSwal("Resmi Sil?","Resmi silmek istiyor musunuz?",()=> {
      const data = {
        bookId: this.selectedBook().id,
        imageUrl: image
      };
  
      this.http.post<string>("Books/RemoveImage", data, res=> {
        this.selectedBook().bookImageNames.splice(index,1);
        this.toast.showToast("Bilgilendirme",res,"info");
        this.getAll();
      });
    })
  }
}
