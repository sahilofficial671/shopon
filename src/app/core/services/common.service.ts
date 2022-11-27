import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService) { }

  handleErrors(errors?: any): void {
    if(errors.status == 'error' && errors.message != null){
      this.toastr.error(errors.message)
      return;
    }
    if(errors.errors && errors.errors.length > 0 && errors.errors[0].defaultMessage != null){
      this.toastr.error(errors.errors[0].defaultMessage)
      return;
    }

    this.toastr.error("Something went wrong. Please try again later");
  }
}
