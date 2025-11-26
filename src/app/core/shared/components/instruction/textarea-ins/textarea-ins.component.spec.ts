import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaInsComponent } from './textarea-ins.component';

describe('TextareaInsComponent', () => {
  let component: TextareaInsComponent;
  let fixture: ComponentFixture<TextareaInsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextareaInsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextareaInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
