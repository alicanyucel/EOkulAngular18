import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlexiToastService } from 'flexi-toast';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private toast: FlexiToastService
  ) { }

  errorHandler(err: HttpErrorResponse) {
    console.log(err);

    switch (err.status) {
      case 0:
        this.toast.showToast("Hata", "API adresine ulaşılamıyor", "error");
        break;

      case 404:
        this.toast.showToast("Hata", "API adresi bulunamadı", "error");
        break;

      case 500:
        for (const errorMessage of err.error.errorMessages) {
          this.toast.showToast("Hata", errorMessage, "error");
        }
        break;

      default:
        this.toast.showToast("Hata", "Bir şeyler ters gitti!", "error");
        break;
    }

  }
}
