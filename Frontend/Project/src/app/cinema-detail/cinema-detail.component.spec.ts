import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaDetailComponent } from './cinema-detail.component';

describe('CinemaDetailComponent', () => {
  let component: CinemaDetailComponent;
  let fixture: ComponentFixture<CinemaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
