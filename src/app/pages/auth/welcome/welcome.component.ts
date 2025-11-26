import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { RoutePath } from 'src/app/core/config';
import { CONSTANTS_TEXT } from 'src/app/core/const/app.constant';
import { staticSidebarMenu } from 'src/app/core/const/sidebar-menu/static-menu';
import { AuthService } from 'src/app/core/service/auth.service';
import { LocalstorageService } from 'src/app/core/service/localstorage.service';
import {
  IsLoading,
  setLoginSuccessfully,
  tokenSet,
} from 'src/app/core/shared/@subject/subjects';
import { PermissionService } from 'src/app/core/shared/function/permissionHandler';
import { login, Response } from 'src/app/core/shared/typings/app.typings';
import { ValidateEmail } from 'src/app/core/validator/email.validator';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  login: FormGroup;
  constant = CONSTANTS_TEXT;
  subs!: Subscription;
  constructor(
    private fb: FormBuilder,
    public router: Router,
    public _authService: AuthService,
    private _localstorageService: LocalstorageService,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    const tokenchecked: boolean = this._authService.loggedIn();
    if (tokenchecked) {
      const firstPage = this.permissionService.firstPermissionPage();
      setTimeout(() => {
        this.router.navigate([firstPage]);
      });
    }
    this.intilizationForm();
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  intilizationForm() {
    this.login = this.fb.group({
      email: ['', [Validators.required]], // ValidateEmail
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.login.controls;
  }

  ngsubmit() {
    if (this.login.invalid) {
      return;
    }
    let payload: login = this.login.value;
    this.loginApi(payload);
  }

  loginApi(payload: any) {
    IsLoading(true);
    this.subs = this._authService
      .login(payload)
      .pipe(finalize(() => IsLoading(false)))
      .subscribe((res: Response) => {
        console.log('Res', res);
        if (res.status) {
          let UserData: any = staticSidebarMenu;
          UserData.data.accessToken = res.data.token;
          console.log('token-------------', UserData);
          localStorage.setItem('User Data', JSON.stringify(UserData.data));
          tokenSet(UserData.data.accessToken, UserData.data.accessToken);
          setLoginSuccessfully(true);
          let permissionArr = UserData.data.role.modules;
          this._localstorageService.setItem(
            'loggedInRole',
            JSON.stringify(permissionArr)
          );
          this.permissionService.mapSideBarMenu();
          const firstPage = this.permissionService.firstPermissionPage();
          setTimeout(() => {
            this.router.navigate([firstPage]);
          });
        } else {
          this._localstorageService.showMessage(
            this.constant.error,
            res.message
          );
        }
      });
  }
}
