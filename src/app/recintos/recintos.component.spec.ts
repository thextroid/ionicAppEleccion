import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecintosComponent } from './recintos.component';

describe('RecintosComponent', () => {
  let component: RecintosComponent;
  let fixture: ComponentFixture<RecintosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecintosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecintosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
