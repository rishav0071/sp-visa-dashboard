import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { CONSTANTS_TEXT } from "../../const/app.constant";
import { siblings, sildeMenu } from "../typings/app.typings";
import { Injectable } from '@angular/core';
import { RoutePath } from "../../config";
import { backButton$, getSiblingsMenu, getbackbutton } from "../@subject/subjects";
 // @ts-ignore
import { sidebarMenu } from "../../const/sidebar-menu/sidebar-menu";
import { Location } from '@angular/common';
import { filter, map, mergeMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class changedRouting {
  id:string = '';
  getparmas:any;
  secoundTimeBack:boolean = false;
  perminsion:boolean = false;
  submneu:sildeMenu[] = sidebarMenu.sort((a:any,b:any)=>{return a.id - b.id});
  pageAction:Object;
  getId:any
  
  public exceptionRoute:string[] = [];

  constructor(private router:Router,
    public activateroute: ActivatedRoute,
    private _location: Location){
      backButton$.subscribe((res:boolean)=>{
        if(res){
          this.secoundTimeBack = res;
        }
      })
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activateroute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.paramMap)
      ).subscribe((par:any) => {
       this.subscribeEndRouter(par.params);
      });
      

    // router.events.subscribe((val:any) => {
    //   if(val instanceof NavigationEnd){
    //   let activeUrl = this.router.url.split('/');
    //   if(activeUrl.length === 2){
    //     if(activeUrl[1] === "login" || activeUrl[1] === "verfication"){
    //     }else{
    //     this.id = '';
    //     let parentRouting:sildeMenu | undefined = this.submneu.find((x:sildeMenu)=>{return x.routerLink === activeUrl[1]})
    //     if(parentRouting){
    //       let siblinngs:siblings | undefined = parentRouting.siblings.find((x:siblings)=>{return x.permission})
    //       if(siblinngs){this.chnagedrouting(parentRouting.routerLink,siblinngs.routerLink,'','',CONSTANTS_TEXT.sibling,parentRouting)}}else{this.notfoundUrl();}
    //     }
    //   }
    //   else if(activeUrl.length === 3){
    //     this.id = '';
    //     let data:sildeMenu | undefined= this.submneu.find((x:sildeMenu)=>{return x.routerLink === activeUrl[1]})
    //     if(data && data.permission){this.chnagedrouting(activeUrl[1],activeUrl[2],'','',CONSTANTS_TEXT.sibling,data)}else{this.notfoundUrl()}
    //   }
    //   else if(activeUrl.length === 4){
    //     let data:sildeMenu | undefined= this.submneu.find((x:sildeMenu)=>{return x.routerLink === activeUrl[1]})
    //     if(data && data.permission){
    //       let lastroute = activeUrl[3].split(';id=');
    //       if(lastroute.length === 2){
    //         this.id = lastroute[1];
    //         this.chnagedrouting(activeUrl[1],activeUrl[2],lastroute[0],'',CONSTANTS_TEXT.subchild,data)
    //       }else{
    //         this.id = '';
    //         this.chnagedrouting(activeUrl[1],activeUrl[2],activeUrl[3],'',CONSTANTS_TEXT.subchild,data)
    //     }
    //     }
    //       else{
    //         this.notfoundUrl()
    //       }
    //     }
    //   }
    // });
  }

  subscribeRouter(params:any){
    let parentRouting:sildeMenu | undefined;
    let childRouting:any = [];
    let grandRouting:any = [];
    this.getId = null;
    if(Object.keys(params).length){
      this.getId = {...params}
    }
    // let currentRoute = this.getparmas == null?this.router.url.split('/'):(this.router.url.split(';')[0]).split('/'); // we can remove ids and other params 
    let currentRoute = this.router.url.split('/') // we can remove ids and other params 
    currentRoute.splice(0, 1); // remove empty string from array
    this.exceptionRoute = currentRoute;
    this.exceptionRoute = [];
    if(this.getId !=null){
      for(let i in this.getId){
       let data = currentRoute.findIndex((x:string)=>{return this.getId[i] === x });
       if(data != -1){
        currentRoute.splice(data,1)
       }
      }
    }
    this.exceptionRoute = currentRoute;
    this.getSliderbarMenu(this.exceptionRoute.length)
    // switch (this.exceptionRoute.length) {
    //   case 1:
    //     this.getSliderbarMenu(1);
    //   case 2:
    //     this.getSliderbarMenu(2);
    //   case 3:
    //     this.getSliderbarMenu(3);
    //   case 4:
    //     this.getSliderbarMenu(4);
    //   case 5:
    //     this.getSliderbarMenu(5);
    // }


    // console.log(currentRoute)
    // console.log(this.getparmas)
    // let parentIndex =  this.submneu.findIndex((x:sildeMenu) => { return this.exceptionRoute.includes(x.routerLink)})

    

    

    // if()
    
    // const i =  this.exceptionRoute.findIndex((route: any) => route == currentRoute[0]); // check if login or other route is there
    
    // parentRouting = this.submneu.find((x:sildeMenu)=>{return x.routerLink === currentRoute[0]})
    // if(i == -1){
    //   if(parentRouting){
    //     if(currentRoute.length == 2){
    //       childRouting = parentRouting.siblings;
    //     }
    //     if(currentRoute.length == 3){
    //       const subindex = parentRouting.siblings.findIndex((routes: any) => routes.routerLink == currentRoute[1]);
    //       if(subindex != -1){
    //         childRouting = parentRouting.siblings[subindex];
    //         if(childRouting.subchild.length > 0){
    //           grandRouting = childRouting.subchild;
    //         }
    //       }
    //     }
      
    //   }
    //   this.changeRouting(currentRoute,parentRouting,childRouting,grandRouting);
    // }
    
  }

  // set menu bar 
  getSliderbarMenu(index:number){
    let parentIndex =  this.submneu.findIndex((x:sildeMenu) => { return this.exceptionRoute.includes(x.routerLink)});
    if(this.submneu[parentIndex].permission){
      if(index === 1){
          let url = this.submneu[parentIndex].siblings.find((x:siblings)=> {return x.permission})
          if(url){
            this.router.navigate([this.submneu[parentIndex].routerLink + '/' + url.routerLink])
            getSiblingsMenu(this.submneu[parentIndex].siblings);
          }else{
            // faild
          }
     }else if(index === 2){
        let url = this.submneu[parentIndex].siblings.find((x:siblings)=> {return this.exceptionRoute.includes(x.routerLink) && x.permission})
        if(url){
          // this.router.navigate([this.submneu[parentIndex].routerLink + '/' + url.routerLink])
          this.getparmas=url
          getSiblingsMenu(this.submneu[parentIndex].siblings);
        }else{
          // faild
        }
      }else if(index === 3){
        let url = this.submneu[parentIndex].siblings.find((x:siblings)=> {return this.exceptionRoute.includes(x.routerLink) && x.permission});
        if(url?.listingAction.length){
          let listingactionValue:string | undefined= url.listingAction.find((x:string) =>{ return this.exceptionRoute.includes(x) })
          if(listingactionValue){
            // this.router.navigate([this.submneu[parentIndex].routerLink + '/' + url.routerLink + '/' + listingactionValue])
            getSiblingsMenu(this.submneu[parentIndex].siblings);
          }
        }
        if(url?.siblings?.length){
          let subchildMenu:siblings | undefined = url.siblings.find((x:siblings) =>{ return this.exceptionRoute[2] ===  x.routerLink && x.permission})
          if(subchildMenu){
            this.getparmas=subchildMenu
            getSiblingsMenu(url.siblings);
          }else{
             // faild
          }
        }
      }else if(index === 4){
      let url = this.submneu[parentIndex].siblings.find((x:siblings)=> {return this.exceptionRoute.includes(x.routerLink) && x.permission});
      if(url?.listingAction.length){
        let listingactionValue:string | undefined= url.listingAction.find((x:string) =>{ return this.exceptionRoute.includes(x) })
        if(listingactionValue){
          // this.router.navigate([this.submneu[parentIndex].routerLink + '/' + url.routerLink + '/' + listingactionValue])
          getSiblingsMenu(this.submneu[parentIndex].siblings);
        }
      }
      if(url?.siblings?.length){
        let subchildMenu:siblings | undefined = url.siblings.find((x:siblings) =>{ return this.exceptionRoute[2] ===  x.routerLink && x.permission})
        if(subchildMenu){
            if(subchildMenu.listingAction){
              let listingactionValue:string | undefined= subchildMenu.listingAction.find((x:string) =>{ return this.exceptionRoute.includes(x) })
              if(listingactionValue){
                // this.router.navigate([this.submneu[parentIndex].routerLink + '/' + url.routerLink + '/' + listingactionValue])
                getSiblingsMenu(url.siblings);
              }
            }else{
              // faild
            }
        }else{
           // faild
        }
      }
      
    }
    }else{
      // faild
    }
   
  }





  
  changeRouting(currentRoute:any,parentRouting:any,childRouting:any,grandRouting:any){
    let type = grandRouting.length > 0?CONSTANTS_TEXT.subchild: childRouting.length > 0?CONSTANTS_TEXT.sibling:CONSTANTS_TEXT.parent
    let data = type == "subchild"?grandRouting:type == "siblingMenu"?childRouting:parentRouting;
    getSiblingsMenu(data)
  }

  navigate(prentUrl:string,siblingUrl:string,subchildurl:string){
    this.router.navigate([prentUrl + '/' + siblingUrl + '/' + subchildurl])
  }




  subscribeEndRouter(params:any){
    this.subscribeRouter(params)
    // if(params){
    //   return;
    // }
    // if(Object.keys(params).length){
    //   this.getparmas = {...params}
    // }else{
    //   this.getparmas = undefined;
    // }

    // let activeUrl = this.router.url.split('/');
    // if(activeUrl.length === 2){
    //   if(activeUrl[1] === "login" || activeUrl[1] === "verfication"){
    //   }else{
    //   this.id = '';
    //   let parentRouting:sildeMenu | undefined = this.submneu.find((x:sildeMenu)=>{return x.routerLink === activeUrl[1]})
    //   if(parentRouting){
    //     let siblinngs:siblings | undefined = parentRouting.siblings.find((x:siblings)=>{return x.permission})
    //     if(siblinngs){this.chnagedrouting(parentRouting.routerLink,siblinngs.routerLink,'','',CONSTANTS_TEXT.sibling,parentRouting)}}else{this.notfoundUrl();}
    //   }
    // }
    // else if(activeUrl.length === 3){
    //   this.id = '';
    //   let data:sildeMenu | undefined= this.submneu.find((x:sildeMenu)=>{return x.routerLink === activeUrl[1]})
    //   console.log("data",data)
    //   if(data && data.permission){this.chnagedrouting(activeUrl[1],activeUrl[2],'','',CONSTANTS_TEXT.sibling,data)}else{this.notfoundUrl()}
    // }
    // else if(activeUrl.length === 4){
    //   let data:sildeMenu | undefined= this.submneu.find((x:sildeMenu)=>{return x.routerLink === activeUrl[1]})
    //   if(data && data.permission){
    //     let lastroute = activeUrl[3].split(';id=');
    //     if(lastroute.length === 2){
    //       this.id = lastroute[1];
    //       this.chnagedrouting(activeUrl[1],activeUrl[2],lastroute[0],'',CONSTANTS_TEXT.subchild,data)
    //     }else{
    //       this.id = '';
    //       this.chnagedrouting(activeUrl[1],activeUrl[2],activeUrl[3],'',CONSTANTS_TEXT.subchild,data)
    //   }
    //   }
    //     else{
    //       this.notfoundUrl()
    //     }
    //   }
  }


  chnagedrouting(prentUrl:string,siblingUrl:string,subchildurl:string,subchildsiblingurl:string, type:string,item:sildeMenu){

    if(type === CONSTANTS_TEXT.parent){
      if(item.permission){
        this.router.navigate([item.routerLink])
        getSiblingsMenu(item)
      }else{
        this.notfoundUrl();
      }
    }else if(type === CONSTANTS_TEXT.sibling){
      if(prentUrl === item.routerLink && item.permission){
        let data:siblings | undefined= item.siblings.find((x:siblings)=>{return x.routerLink === siblingUrl})
        if(data && data.permission){
          getSiblingsMenu(item.siblings)
          this.router.navigate([prentUrl + '/' + siblingUrl])
          this.pageAction = data.action
        }else
        this.notfoundUrl();
      }else{
        if(this.secoundTimeBack){
          getbackbutton(false);
          this._location.back();
        }else{
          this.notfoundUrl();
        }
      }
    }else if(type === CONSTANTS_TEXT.subchild){
        let siblingrote:siblings | undefined = item.siblings.find((x:siblings)=>{return x.routerLink === siblingUrl})
          if(siblingrote && siblingrote.permission){
             let subchild:siblings | undefined= siblingrote?.siblings?.find((x:siblings)=>{return x.routerLink === subchildurl})
              if(subchild && subchild.permission){
                getSiblingsMenu(siblingrote.siblings)
                if(this.id !=''){
                // let parmas:any =   this.router;
                //   parmas.browserUrlTree.root.children.primary.segments[2].parameters
                  this.router.navigate([prentUrl + '/' + siblingUrl + '/' + subchildurl,this.getparmas])
                }else{
                  this.router.navigate([prentUrl + '/' + siblingUrl + '/' + subchildurl])
                }
                this.pageAction = subchild.action

              }else{
                let listingaction:string | undefined = siblingrote.listingAction.find((x:string) =>{return x === subchildurl})
                getSiblingsMenu(item.siblings);
                if(listingaction){
                  if(this.id !=''){
                    this.router.navigate([prentUrl + '/' + siblingUrl + '/' + subchildurl,this.getparmas])
                  }else{
                    this.id = '';
                    this.router.navigate([prentUrl + '/' + siblingUrl + '/' + subchildurl])
                  }
                }else{
                  this.notfoundUrl()
                }
              }

          }else{
            this.notfoundUrl()
          }
    }
  }

  notfoundUrl(){
    this.router.navigate([RoutePath.pageNot_found])
  }
}
