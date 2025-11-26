import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CONSTANTS_TEXT } from 'src/app/core/const/app.constant';
import { LocalstorageService } from 'src/app/core/service/localstorage.service';
import { ModelOpenService } from 'src/app/core/service/model-open.service';
import { UserService } from 'src/app/core/service/user.service';
import { PaginationComponent } from 'src/app/core/shared/components/pagination/pagination/pagination.component';
import { UserModalComponent } from 'src/app/core/shared/dialog-modal/master-data/user-modal/user-modal.component';
import { WarningComponent } from 'src/app/core/shared/dialog-modal/warning/warning/warning.component';
import {
  ApiResponse,
  pagination,
  paginationFilter,
  searchFilter,
} from 'src/app/core/shared/typings/app.typings';
import { userInterface } from 'src/app/core/shared/typings/interface.typing';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  showSpin: boolean = false;
  viewSideBar: boolean = false;
  paginationdata: pagination = { pageNumber: 0, pageSize: 10, length: 100 };
  subs$!: Subscription;
  searchName: string = '';
  searchFilterAction: searchFilter = {
    button: true,
    placeholder: 'Search...',
    output: 'button',
    keyup: true,
  };
  getDataList: userInterface[] = [];
  @ViewChild(PaginationComponent) child: PaginationComponent;

  constructor(
    private openModelservice: ModelOpenService,
    public _UserService: UserService,
    private _localstorageService: LocalstorageService // private router: Router, //  private activatedRoute: ActivatedRoute
  ) {
    this.openModelservice.dataModelClose$.subscribe(
      (res: { status: boolean; data: any; type: string; id: string }) => {
        if (res.status && res.type === CONSTANTS_TEXT.createUser) {
          this.getUserData();
          this.openModelservice.closemodelback({ status: false });
        } else if (res.status && res.type === CONSTANTS_TEXT.updateUser) {
          this.openModelservice.closemodelback({ status: false });
          this.confirmUpdateUserData(res.data);
        } else if (res.status && res.type === CONSTANTS_TEXT.deleteUser) {
          this.openModelservice.closemodelback({ status: false });
          this.confirmDeleteUserData(res.data);
        }
      }
    );
  }
  ngOnInit(): void {
    this.getUserData();
  }

  ngOnDestroy() {
    if (this.subs$) {
      this.subs$.unsubscribe();
    }
  }

  filterData(event: string) {
    this.searchName = event;
    this.paginationdata.pageNumber = 0;
    this.paginationdata.pageSize = 10;
    // this.child.resetPage()
    this.getUserData();
  }

  // get all  list
  getUserData() {
    this.showSpin = true;
    let payload: paginationFilter = {
      skip: this.paginationdata.pageNumber,
      limit: this.paginationdata.pageSize,
    };
    // if (this.searchName != '') {
    //   payload['name'] = this.searchName;
    // }
    this.subs$ = this._UserService
      .getUser(payload)
      .pipe()
      .subscribe((res: ApiResponse) => {
        if (res.status) {
          this.getDataList = res.data;
          if (res.pagination?.totalCount) {
            this.paginationdata.length = res.pagination?.totalCount;
          }
          this.showSpin = false;
        } else {
          this.showSpin = false;
          this._localstorageService.showMessage(
            CONSTANTS_TEXT.error,
            res.errorMessage
          );
        }
      });
  }

  // open created and updated modal
  openCateogryModal(data?: userInterface) {
    this.openModelservice.openModel({
      width: '400px',
      maxWidth: '100vw',
      maxHeight: '94vh',
      panelClass: 'modalLightGrayV4',
      data: {
        component: UserModalComponent,
        data: data,
        type: CONSTANTS_TEXT.createUser,
      },
    });
  }

  // edit user modal
  editUser(data: userInterface) {
    this.openModelservice.openModel({
      width: '400px',
      maxWidth: '100vw',
      maxHeight: '94vh',
      panelClass: 'modalLightGrayV4',
      data: {
        component: UserModalComponent,
        data: data,
        type: CONSTANTS_TEXT.updateUser,
      },
    });
  }

  // view user data
  viewdetails(data?: userInterface) {
    if (data) {
      this.viewSideBar = !this.viewSideBar;
    }
  }

  // pagination get data
  paginationGet(event: any) {
    this.paginationdata.pageNumber = event.pageIndex + 1;
    this.paginationdata.pageSize = event.pageSize;
    this.getUserData();
  }

  // delete particular data
  deleteUserData(data: userInterface) {
    let payload = {
      confirmMessage: 'Are you sure? You want to delete this user.',
      data: data,
      type: CONSTANTS_TEXT.deleteUser,
    };
    this.openModelservice.openModel({
      width: '640px',
      maxWidth: '100vw',
      maxHeight: '94vh',
      panelClass: 'modalLightGrayV4',
      data: { component: WarningComponent, confirm: payload },
    });
  }

  toggleUserStatus(data: userInterface) {
    console.log('Dataaa', data);
    let payload = {
      confirmMessage: 'Are you sure you want to change the user status?',
      data: { ...data, isActive: data.isActive },
      type: CONSTANTS_TEXT.updateUser,
    };
    this.openModelservice.openModel({
      width: '640px',
      maxWidth: '100vw',
      maxHeight: '94vh',
      panelClass: 'modalLightGrayV4',
      data: { component: WarningComponent, confirm: payload },
    });
  }

  confirmUpdateUserData(data: userInterface) {
    console.log('Data', data);

    // Check if this is a status toggle or full user update
    if (data.hasOwnProperty('isActive')) {
      // This is a status toggle
      const payload = {
        isActive: data?.isActive ? false : true,
        userId: data?._id,
      };
      console.log('Status toggle payload', payload);
      this.showSpin = true;
      this.subs$ = this._UserService
        .updateUser(payload, data?._id as string)
        .subscribe((res: ApiResponse) => {
          if (res.status === 'success') {
            this._localstorageService.showMessage(
              CONSTANTS_TEXT.success,
              'User status updated successfully'
            );
            this.getUserData();
          } else {
            this._localstorageService.showMessage(
              CONSTANTS_TEXT.error,
              res.errorMessage
            );
          }
          this.showSpin = false;
        });
    } else {
      // This is a full user update from edit modal
      this._localstorageService.showMessage(
        CONSTANTS_TEXT.success,
        'User updated successfully'
      );
      this.getUserData();
    }
  }

  confirmDeleteUserData(data: userInterface) {
    console.log('Delete Data', data);
    this.showSpin = true;
    this.subs$ = this._UserService
      .deleteUser(data?._id as string)
      .subscribe((res: ApiResponse) => {
        if (res.status === 'success') {
          this._localstorageService.showMessage(
            CONSTANTS_TEXT.success,
            'User deleted successfully'
          );
          this.getUserData();
        } else {
          this._localstorageService.showMessage(
            CONSTANTS_TEXT.error,
            res.errorMessage
          );
        }
        this.showSpin = false;
      });
  }
}
