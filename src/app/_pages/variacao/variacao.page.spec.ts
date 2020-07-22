import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {VariacaoPage} from './variacao.page';

describe('VariacaoPage', () => {
  let component: VariacaoPage;
  let fixture: ComponentFixture<VariacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariacaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VariacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
