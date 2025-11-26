import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/core/service/http.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { LocalstorageService } from 'src/app/core/service/localstorage.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WelcomeComponent } from './welcome.component';
import { AuthServiceMock } from 'src/app/core/test/mocks/service/auth-service.mock';
// import { RoutePath } from 'src/app/core/config';

fdescribe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers:[
        LocalstorageService,
        HttpService,
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: ToastrService, useClass: ToastrService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not contain a default value for welcome form', () =>{
    expect(component.login.value).toEqual({email:''})
  })
 
  it('Should create a form with 1 controls', () => {
		expect(component.login.contains('email')).toBeTruthy();
	});
  
  it('should navigate to the verfication', () =>{
    spyOn(component.router, 'navigate');
    component.loginApi({email:"testing@.co"});
    expect(component.router.navigate).toHaveBeenCalled();
  })

  // it('should navigate not working', () =>{
  //   spyOn(component.router, 'navigate');
  //   component.loginApi({email:"testing@.co"});
  //   expect(component.router.navigate).toHaveBeenCalled();
  // })
})
