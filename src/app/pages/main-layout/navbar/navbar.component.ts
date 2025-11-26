import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RoutePath } from 'src/app/core/config';
import { CONSTANTS_TEXT } from 'src/app/core/const/app.constant';
// import { sidebarMenu } from 'src/app/core/const/sidebar-Menu/sidebar-menu';
import { LocalstorageService } from 'src/app/core/service/localstorage.service';
import { ApiResponse, ManageMemberFilter, NavBarMember, pagination, siblings, sildeMenu, ManageMember } from "../../../core/shared/typings/app.typings";
import { changedRouting } from 'src/app/core/shared/function/changedRouting';
import { pickFirstAlphabetOfEachWord } from 'src/app/core/shared/function/function';
import { debounceTime, distinctUntilChanged, finalize, fromEvent, map, tap } from 'rxjs';
import * as _ from 'lodash';
// import { ManageMember } from 'src/app/core/shared/typings/manage-member.typings';
import { ActivatedRoute, Router } from '@angular/router';
// import { NavBarService } from 'src/app/core/service/commonService/nav-bar.service';
import { AuthService } from 'src/app/core/service/auth.service';
// import { MoengageService } from 'src/app/core/service/commonService/moengage.service';
// import { ViewNotificationComponent } from '../view-notification/view-notification.component';
import { ModelOpenService } from 'src/app/core/service/model-open.service';
import { WarningComponent } from 'src/app/core/shared/dialog-modal/warning/warning/warning.component';
// import { GuidelineService } from 'src/app/core/service/guidelines.service';
// import { MakeCall } from 'src/app/core/shared/typings/profile.typings';
import { getNotificationCount$ } from 'src/app/core/shared/@subject/subjects';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // @ViewChild(ViewNotificationComponent) viewNotificationComponent!: ViewNotificationComponent;
  notificationCount: number;

  userId: string;
  userName: string;

  filterAdvanced: boolean = false;

  externalLink = RoutePath;
  sidebarMenu!: sildeMenu[];
  constant = CONSTANTS_TEXT;
  filterString: string = '';
  @ViewChild('searching', { static: true }) search: ElementRef;
  memberListData: ManageMember[] = []
  showSpin: boolean = false
  typing: boolean = false
  paginationData: pagination = { pageNumber: 1, pageSize: 10, length: 100 }
  filterObject: ManageMemberFilter = {}
  totalCount: any;
  lazyLoading: boolean = false
  profileImage: string
  modelTriggerEvent: boolean = false;

  constructor(
    private _localstorageService: LocalstorageService,
    private _changedRouting: changedRouting,
    // private navBarService: NavBarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    // private moengageService: MoengageService,
    private modelService: ModelOpenService,
    // private _guidelineService: GuidelineService,
  ) {
    // // if yes then call the api 
    // this.modelService.dataModelClose$.subscribe((result: { status: boolean, id: string, type: string, data: any, }) => {
    //   if (result.status && result.type === CONSTANTS_TEXT.profileCall && this.modelTriggerEvent) {
    //     this.modelTriggerEvent = false;
    //     this.callApi(result.data.id);
    //   }
    // })
    // Get user id from localstorage
    const userData = localStorage.getItem('User Data');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.employeeDetails.id;
      this.userName = user.employeeDetails.firstName;
      this.profileImage = user.employeeDetails.profileImage
    }
    getNotificationCount$.subscribe((res: number) => {
      if (res) {
        this.notificationCount = res
      }
    })
  }

  ngOnInit(): void {
    this.sidebarMenu = this._changedRouting.submneu;
  }

  //make call
  // makeCall(dataObject: any) {
  //   let data = { confirmMessage: `Are you sure want call the customer ${dataObject.code} ${dataObject.name} ?`, data: dataObject, type: CONSTANTS_TEXT.profileCall }
  //   this.modelTriggerEvent = true
  //   this.modelService.openModel({ width: '640px', maxWidth: '100vw', maxHeight: '94vh', panelClass: 'modalLightGrayV4', data: { component: WarningComponent, confirm: data } });
  // }

  // call api integrate 
  // callApi(id: string) {
  // let payload: MakeCall = { customerId: id }
  //   this._guidelineService.makeCall(payload).subscribe((res: ApiResponse) => {
  //     if (res.success) {
  //       let successMessage = "You have successfull call the customer";
  //       if (res.message) res.message = successMessage
  //       this._localstorageService.showMessage(CONSTANTS_TEXT.success, successMessage)
  //     }
  //     else {
  //       this._localstorageService.showMessage(CONSTANTS_TEXT.error, res.message)
  //     }
  //   })
  // }

  routing(prentUrl: string, siblingUrl: string, type: string, item: sildeMenu) {
    if (type === this.constant.parent) {
      let siblinngs: siblings | undefined = item.siblings.find((x: siblings) => {
        return x.permission
      })
      if (siblinngs) {
        // this._changedRouting.chnagedrouting(prentUrl, siblinngs.routerLink, '', '', this.constant.sibling, item)
        this._changedRouting.navigate(prentUrl, siblinngs.routerLink, '')
      }
    } else {
      // this._changedRouting.chnagedrouting(prentUrl, siblingUrl, '', '', type, item)
      this._changedRouting.navigate(prentUrl, siblingUrl, '')
    }
  }

  toggleFollowUp(): void {
    this.filterAdvanced = !this.filterAdvanced;
    // if (this.filterAdvanced && this.viewNotificationComponent) {
    //   this.viewNotificationComponent.getAllNotification();
    // }
  }

  logout() {
    // this._authService.logout().subscribe((res: ApiResponse) => {
    //   if (res.success) {
    this._localstorageService.logout();
    // this.moengageService.logout();
    //   }
    //   else {
    //     this._localstorageService.logout();
    //     this._localstorageService.showMessage(CONSTANTS_TEXT.error, res.message)
    //   }
    // })
  }

  ngAfterViewInit(): void {
    if (this.search && this.search.nativeElement) {
      const searchTerm = fromEvent<any>(this.search.nativeElement, 'keyup').pipe(
        map(event => event.target.value),
        tap(() => { this.typing = true }),
        debounceTime(500),
        distinctUntilChanged()
      )

      searchTerm.subscribe((res: string) => {
        if (res.trim() != '') {
          this.filterData(this.filterString)
        }
      })
    }
  }
  // filter data by name , id and phone number
  filterData(event: string) {
    this.typing = false
    this.filterObject = {}
    if (event) {
      this.paginationData.pageNumber = 1
      // this.filterObject = searchWithCodeNumberName(event)
      this.showSpin = true
      // this.getMemberList(this.filterObject)
    }
  }

  // getMemberList(filterData: ManageMemberFilter) {
  //   let payload: NavBarMember = { page: this.paginationData.pageNumber, limit: this.paginationData.pageSize }
  //   if (!_.isEmpty(filterData)) {
  //     if (filterData.name) {
  //       payload.name = filterData.name
  //     } else if (filterData.code) {
  //       payload.code = filterData.code
  //     } else if (filterData.phoneNumber) {
  //       payload.phoneNumber = filterData.phoneNumber
  //     }
  //   }
  //   this.navBarService.getMemberData(payload).pipe(finalize(() => { this.showSpin = false; this.lazyLoading = false })).subscribe((result: ApiResponse) => {
  //     if (result.success == true) {
  //       if (this.paginationData.pageNumber === 1) {
  //         this.memberListData = result.data;
  //       } else {
  //         this.memberListData = [...this.memberListData, ...result.data];
  //       }
  //       this.totalCount = result.pagination?.totalCount
  //     } else {
  //       this.memberListData = []
  //     }
  //   }, (error) => {
  //     this.memberListData = []
  //   })
  // }

  // get avatar logo with name
  getLogo(name: string) {
    return pickFirstAlphabetOfEachWord(name)
  }

  getFirstLetter(name: string) {
    if (name) {
      return pickFirstAlphabetOfEachWord(name);
    } else {
      return name
    }
  }

  onScroll() {
    // if (this.totalCount > this.memberListData.length) {
    //   this.lazyLoading=true
    //   this.paginationData.pageNumber = this.paginationData.pageNumber + 1;
    //   this.getMemberList(this.filterObject)
    // }
  }
}
