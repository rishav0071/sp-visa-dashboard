import { Component } from '@angular/core';
import {
  getLoginSuccessfully$,
  setEmployeesList,
  setNotificationCount,
  setReporteeList,
} from './core/shared/@subject/subjects';
import { AuthService } from './core/service/auth.service';
// import { NotificationService } from './core/service/navbar/notification.service';
import { PermissionService } from './core/shared/function/permissionHandler';
import { LocalstorageService } from './core/service/localstorage.service';
// import { ChatService } from './core/service/chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin-panel';
  userDetail: any = {};
  userData: any = {};
  allowedId = [
    '5bf2d96e-35b8-42bd-988b-58e58660a68e',
    '69517456-309a-4397-b527-ec5912779288',
    '34be0eef-10d1-4c16-aaad-64d4e963e509',
  ];

  constructor(
    private authService: AuthService,
    // private notificationService: NotificationService,
    private permissionService: PermissionService,
    private localStorage: LocalstorageService
  ) {
    if (this.authService.loggedIn()) {
      this.permissionService.mapSideBarMenu();
      // this.getNotificationCount()
    }
    // getLoginSuccessfully$.subscribe((res:boolean) =>{
    //   if(res){
    //     this.getAllEmployee();
    //     this.getChatToken()
    //     this.getAllReportee()
    //     // this.getNotificationCount();
    //   }
    // })
  }

  ngAfterViewInit() {
    // if (this.authService.loggedIn()) {
    //   console.log(this.userDetail, 'moengage userDetails');
    //   const userDataString = this.localStorage.getItem('User Data');
    //   if (userDataString) {
    //     this.userData = JSON.parse(userDataString);
    //     console.log(this.userDetail,this.userData, 'moengage userDetails');
    //   } else {
    //     console.log('User data not found in localStorage');
    //   }
    //   this.addMoengageDetails();
    //   // this.socketService.initializeSocket(this.userData?.employeeDetails.id)
    // }
  }

  addMoengageDetails() {
    this.userDetail.firstName = this.userData?.employeeDetails?.firstName;
    this.userDetail.lastName = this.userData?.employeeDetails?.lastName;
    this.userDetail.username = this.userData?.employeeDetails?.displayName;
    this.userDetail.email = this.userData?.employeeDetails?.email;
    this.userDetail.phone =
      this.userData?.employeeDetails?.countryCode +
      this.userData?.employeeDetails?.phoneNumber;
    this.userDetail.uuid = this.userData?.employeeDetails?.email;
  }

  // get notification count
  getNotificationCount() {
    // this.notificationService.getPushNotificationCount().subscribe((result) => {
    //   setNotificationCount(result.data)
    // })
  }
}
