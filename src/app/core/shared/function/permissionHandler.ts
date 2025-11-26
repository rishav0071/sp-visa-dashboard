import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { sidebarMenu } from "../../const/sidebar-menu/sidebar-menu";
import { siblings, siblingsMenu, sildeMenu} from '../typings/app.typings';
import { LocalstorageService } from '../../service/localstorage.service';
import { ISibling } from '../typings/manageRole.typing';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private dataSubject = new BehaviorSubject<any>({});
  private data: any = {}; // Store the current data

  constructor(
    private _localstorageService: LocalstorageService,
  ) {}

  async getData(): Promise<any> {
    const data = this.dataSubject.getValue();

    // If the data is empty, call setDataIfEmpty and then return the data
    if (Object.keys(data).length === 0) {
      await this.setDataIfEmpty(); // Call setDataIfEmpty
      return this.dataSubject.getValue(); // Return the data after it's set
    }

    return data; // Return the data if it's not empty
  }

  async setDataIfEmpty() {
    if (Object.keys(this.data).length === 0) {
      // Use your logic to fetch or set data when it's empty
     
      this.data = this.transformArrayToObject(sidebarMenu);
      this.dataSubject.next(this.data);
    }
  }

   transformArrayToObject(arr:any) {
    const result:any = {};
  
    function processItem(item:any) {
      if (item.name) {
        result[item.name] = { permission: item.permission };
      }
      if (item.listingAction && item.crudAction && item.action) {
        item.crudAction.forEach((crud:any) => {
          if (item.listingAction.includes(crud.name)) {
            result[crud.name] = { permission: item.action[crud.type] };
          }
        });
      }
      if (item.siblings) {
        item.siblings.forEach(processItem);
      }
      if (item.subchild) {
        item.subchild.forEach(processItem);
      }
    }
    arr.forEach(processItem);
    return result;
  }

  checkPermissionAction(name:string,actionList:any){
    return actionList[name]
  }


  // map side bar menu with according to permission
  mapSideBarMenu(){
    if(this._localstorageService.getItem('loggedInRole')){
      const data:any=this._localstorageService.getItem('loggedInRole')      
      const pagePermission=JSON.parse(data)
      let sidebarList:sildeMenu[]=sidebarMenu
      for (const permissionList of pagePermission){
        for(const pageList of sidebarList){
          const roleAvailable = permissionList.siblings.findIndex((sibling: any) => sibling.permission === true)
          if(permissionList.title==pageList.title && (permissionList.siblings && permissionList.siblings.length) && roleAvailable!==-1){
            pageList.permission=true // if siblings length is there then show it true
            pageList.subMenu=this.subMenu(pageList.subMenu,permissionList.siblings)
            pageList.siblings=this.siblings(pageList.siblings,permissionList.siblings)
          }
        }
      }    

    }
  }

  // Handle sub menu permission
  subMenu(submenu:siblingsMenu[],siblings:ISibling[]){
    for (const sibling of siblings){
      for (const menu of submenu){
        if(sibling.title==menu.title){
          menu.permission=sibling.permission ?? false
          break;
        }
      }
    }
    return submenu
  }

  // Handle sibling permission
  siblings(siblings:siblings[],apiSiblings:ISibling[]){
    for (const apisibling of apiSiblings){
      for (const sibling of siblings){
        if(apisibling.title==sibling.title){
          sibling.permission=apisibling.permission ?? false
          sibling.action=this.actionPermission(apisibling.actions)
          if (sibling.siblings) {
            sibling.siblings = this.subChildPermission(sibling.siblings, apisibling.siblings ?? []);
          }
          break;
        }
      }
    }
    return siblings
  }

  // Handle sub child permission inside of sibling
  subChildPermission(subChilds:siblings[],apiSubChilds:ISibling[]){
    for (const apiSubChild of apiSubChilds){
      for (const subChild of subChilds){
        if(apiSubChild.title==subChild.title){
          subChild.permission=apiSubChild.permission ?? false
          subChild.action=this.actionPermission(apiSubChild.actions)
          break;
        }
      }
    }
    return subChilds
  }

  // handle all action permission
  actionPermission(apiaction?:any){
    const action = apiaction?.reduce((acc:any, item:any) => {
      // acc[item.name] = true;
      acc[item.name] = item.permission
      return acc;
    }, {});
    return action ?? {}
  }


  firstPermissionPage(){
    let route=''
    for(var i=0;i<sidebarMenu.length; i++){
      if(sidebarMenu[i].permission){
        route=sidebarMenu[i].routerLink
        break
      }
    }
    return route
  }

}