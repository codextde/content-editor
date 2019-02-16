import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDataWindowComponent } from './upload-data-window.component';

describe('UploadDataWindowComponent', () => {
  let component: UploadDataWindowComponent;
  let fixture: ComponentFixture<UploadDataWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDataWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
