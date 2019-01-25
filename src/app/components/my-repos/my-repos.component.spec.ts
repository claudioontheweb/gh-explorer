import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReposComponent } from './my-repos.component';

describe('MyReposComponent', () => {
  let component: MyReposComponent;
  let fixture: ComponentFixture<MyReposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
