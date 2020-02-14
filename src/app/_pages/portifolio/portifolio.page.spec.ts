import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {PortifolioPage} from './portifolio.page';

describe('PortifolioPage', () => {
  let component: PortifolioPage;
  let fixture: ComponentFixture<PortifolioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortifolioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PortifolioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
