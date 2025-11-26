import { Component ,OnInit} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { siblingMenu$ } from "src/app/core/shared/@subject/subjects";
import { changedRouting } from "src/app/core/shared/function/changedRouting";
import { siblings, sildeMenu } from "src/app/core/shared/typings/app.typings";

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styles: [`
  .addClass{
    flex: 0 0 210px;
    max-width: 210px;
    .sidebar-menus {
            .nav-item {
                .nav-link {
                    .name {
                        display: block;
                    }
                }
            }
        }
  }
  `]
})

export class LayoutComponent implements OnInit {
  siblingMenu!:any;
  id:string;
  routerurl:string;
  lastURl:string;
  selectedRoute:string [] = [];
  classNavBar:boolean = false;
  constructor(private router:Router,private _changedRouting:changedRouting){
    siblingMenu$.subscribe((res:sildeMenu)=>{
      if(res){
        this.siblingMenu = res;
        this.selectedRoute = this._changedRouting.exceptionRoute;
        this.selectedTab();
      }
    })
  }

  ngOnInit(): void {
    this.selectedRoute = this._changedRouting.exceptionRoute;
    this.selectedTab()
  }

  selectedTab(){
    if(1 < this.selectedRoute.length)
    this.lastURl = this.siblingMenu && this.siblingMenu.find((x:{routerLink:string})=>{return this.selectedRoute.includes(x.routerLink)}).routerLink;
    if(this.lastURl === 'profile'){
      this.classNavBar = true;
    }else{
      this.classNavBar = false;
    }
  }

  changedMouse(){
    this.classNavBar = false;
  }

  changedrouter(url:string){
    // let selected = this.siblingMenu.findIndex((x:any) => {return  url === x.routerLink});
    let index  = this.selectedRoute.findIndex((x:string) => {return this.siblingMenu.find((y:{routerLink:string}) => {return x == y.routerLink  }) })
    let urladd:string[] = [];
    for(let i =0; i < index; i++){
      urladd.push(this.selectedRoute[i])
    }
    if(this._changedRouting.getId !=null){
      if(this._changedRouting.getId?.clientId){
        this.router.navigate([urladd.join('/') + '/'+url+'/'+this._changedRouting.getId?.clientId])
      }else{
        this.router.navigate([urladd.join('/')+'/'+url])
      }
    }else{
      this.router.navigate([urladd.join('/')+'/'+url])
    }
    this.lastURl = url;

    // setTimeout(() => {
    //   this.selectedTab();
    // }, 2000);
    // if(this._changedRouting.getparmas !=null){
    //   let parmas:string[] = [];
    //   for(let i in this._changedRouting.getparmas){
    //     parmas.push(this._changedRouting.getparmas[i])
    //   }
    //   this.router.navigate([urladd.join('/')+ '/' + parmas.join('/')])
    // }else{
    //   this.router.navigate([urladd.join('/')])
    // }
    
  // let checked =  this.checkroutingMatch(url);
  // if(checked === 2){
  //   let baseurl = this.routerurl.split('/');
  //   baseurl.splice(baseurl.length-1, 1);
  //   this.router.navigate([baseurl + '/' + url])
  // }else{
  //   if(this.id !=''){
  //     this.router.navigate([this.routerurl + '/' + url,])
  //   }else{
  //     this.router.navigate([this.routerurl + '/' + url])
  //   }
  // }
  }

// listing action routing 
  // checkroutingMatch(url:string){
  //   let baseurl =  this.routerurl.split('/')
  //   let arr = [];
  //   let chackedlenght = [];
  //   arr.push(baseurl[baseurl.length - 1]);
  //   arr.push(url);
  //   for(let i = 0; i < this.siblingMenu.length; i++){
  //     for(let j =0; j < arr.length; j++){
  //       if(this.siblingMenu[i].routerLink === arr[j]){
  //         chackedlenght.push(arr[j]);
  //       }
  //     }
  //   }
  //   return chackedlenght.length;
  // }
}
