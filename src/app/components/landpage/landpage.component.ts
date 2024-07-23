import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TrCurrencyPipe } from 'tr-currency';
import { CategoryModel } from '../../models/category.model';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landpage',
  standalone: true,
  imports: [TrCurrencyPipe, RouterLink, CommonModule],
  templateUrl: './landpage.component.html',
  styleUrl: './landpage.component.css'
})
export default class LandpageComponent implements OnInit {  
  basketCount = signal<number>(0);
  books = signal<{price: number, discountPrice?: number}[]>([
    {
      price: 16.99,
      discountPrice: 7
    },
    {
      price: 9.99      
    },
    {
      price: 16.99,
      discountPrice: 7
    },
    {
      price: 16.99,
      discountPrice: 7
    },
    {
      price: 9.99      
    },
    {
      price: 16.99,
      discountPrice: 7
    }
  ]);
  categories = signal<CategoryModel[]>([]);
  selectedCategory = signal<string>("");


  #http = inject(HttpService);

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.#http.get<CategoryModel[]>(`Categories/GetAll`,res=> {
      this.categories.set(res);
    });
  }

  selectCategory(id: string){
    this.selectedCategory.set(id);
  }
}
