import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { BreadCrumbModel } from '../blank/blank.component';
import { CategoryModel } from '../../models/category.model';
import { FlexiToastService } from 'flexi-toast';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export default class CategoriesComponent {
  breadCrumbs = signal<BreadCrumbModel[]>([
    {
      name: "Ana Sayfa",
      class: "",
      route: "/admin"
    },
    {
      name: "Kategories",
      class: "active",
      route: "/admin/categories"
    }
  ]);
  datas = signal<CategoryModel[]>([]);
  isLoading = signal<boolean>(false);

  addModel = signal<CategoryModel>(new CategoryModel());
  updateModel = signal<CategoryModel>(new CategoryModel());

  @ViewChild("addModalCloseBtn") addCloseBtn: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("updateModalCloseBtn") updateCloseBtn: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private http: HttpService,
    private toast: FlexiToastService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.isLoading.set(true);
    this.http.get<CategoryModel[]>("Categories/GetAll", (res) => {
      this.datas.set(res);
      this.isLoading.set(false);
    }, () => this.isLoading.set(false));
  }

  create(){
    this.http.post<string>(`Categories/Create`, this.addModel(),(res)=> {
      this.toast.showToast("Başarılı",res,"success");
      this.addCloseBtn!.nativeElement.click();
      this.addModel.set(new CategoryModel());
      this.getAll();
    });
  }

  deleteById(id: string){
    this.toast.showSwal("Sil?","Bu kaydı silmek istiyor musunuz?",()=> {
      this.http.post<string>("Categories/DeleteById",{id: id},(res)=> {
        this.toast.showToast("Bilgilendirme",res,"info");
        this.getAll();
      });
    })
  }

  get(item: CategoryModel){
    this.updateModel.set({...item});
  }

  update(){
    this.http.post<string>(`Categories/Update`, this.updateModel(),(res)=> {
      this.toast.showToast("Bilgilendirme",res,"info");
      this.updateCloseBtn!.nativeElement.click();
      this.getAll();
    });
  }
}
