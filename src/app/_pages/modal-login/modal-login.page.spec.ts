import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ModalLoginPage} from './modal-login.page';

describe('ModalLoginPage', () => {
  let component: ModalLoginPage;
  let fixture: ComponentFixture<ModalLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
