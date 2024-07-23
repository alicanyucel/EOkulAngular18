import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { BreadCrumbModel } from '../blank/blank.component';
import { UserTypeModel } from '../../models/user-type.model';
import { HttpService } from '../../services/http.service';
import { FlexiToastService } from 'flexi-toast';

@Component({
  selector: 'app-user-types',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-types.component.html',
  styleUrl: './user-types.component.css'
})
export default class UserTypesComponent implements OnInit {
  breadCrumbs = signal<BreadCrumbModel[]>([
    {
      name: "Ana Sayfa",
      class: "",
      route: "/admin"
    },
    {
      name: "Kullanıcı Tipleri",
      class: "active",
      route: "/admin/user-types"
    }
  ]);
  userTypes = signal<UserTypeModel[]>([]);
  isLoading = signal<boolean>(false);

  addModel = signal<UserTypeModel>(new UserTypeModel());
  updateModel = signal<UserTypeModel>(new UserTypeModel());

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
    this.http.get<UserTypeModel[]>("UserTypes/GetAll", (res) => {
      this.userTypes.set(res);
      this.isLoading.set(false);
    }, () => this.isLoading.set(false));
  }

  create(){
    this.http.post<string>(`UserTypes/Create`, this.addModel(),(res)=> {
      this.toast.showToast("Başarılı",res,"success");
      this.addCloseBtn!.nativeElement.click();
      this.addModel.set(new UserTypeModel());
      this.getAll();
    });
  }

  deleteById(id: string){
    this.toast.showSwal("Sil?","Bu kaydı silmek istiyor musunuz?",()=> {
      this.http.post<string>("UserTypes/DeleteById",{id: id},(res)=> {
        this.toast.showToast("Bilgilendirme",res,"info");
        this.getAll();
      });
    })
  }

  get(item: UserTypeModel){
    this.updateModel.set({...item});
  }

  update(){
    this.http.post<string>(`UserTypes/Update`, this.updateModel(),(res)=> {
      this.toast.showToast("Bilgilendirme",res,"info");
      this.updateCloseBtn!.nativeElement.click();
      this.getAll();
    });
  }
}
