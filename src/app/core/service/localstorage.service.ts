import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePath } from '../config';
import { CONSTANTS_TEXT } from 'src/app/core/const/app.constant'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  loader: boolean;
  constant = CONSTANTS_TEXT;
  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) { }

  // logout 
  logout() {
    // this.socketService.disconnectSocket()
    localStorage.clear();
    this.router.navigate([RoutePath.Empty]);
    // location.href = "/login"
  }

  // message show tostor function 
  showMessage(type: string, message: string | any) {
    this.toastr.clear();
    setTimeout(() => {
      if (type == this.constant.info) {
        this.toastr.info(message)
      } else if (type == this.constant.error) {
        this.toastr.error(message)
      } else if (type == this.constant.success) {
        this.toastr.success(message)
      } else if (type == this.constant.warning) {
        this.toastr.warning(message)
      }
    }, 300);
  }

  setItem(key: string, data: string) {
    localStorage.setItem(key, data)
  }

  getItem(key: string) {
    return localStorage.getItem(key)
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }


}
