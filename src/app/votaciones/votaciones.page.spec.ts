import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VotacionesPage } from './votaciones.page';

describe('VotacionesPage', () => {
  let component: VotacionesPage;
  let fixture: ComponentFixture<VotacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotacionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VotacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
