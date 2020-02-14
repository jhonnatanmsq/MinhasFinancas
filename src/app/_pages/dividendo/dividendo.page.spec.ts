import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {DividendoPage} from './dividendo.page';

describe('DividendoPage', () => {
  let component: DividendoPage;
  let fixture: ComponentFixture<DividendoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividendoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DividendoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
