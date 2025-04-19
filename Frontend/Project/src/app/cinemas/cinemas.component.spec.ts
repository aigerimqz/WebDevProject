import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemasComponent } from './cinemas.component';

describe('CinemasComponent', () => {
  let component: CinemasComponent;
  let fixture: ComponentFixture<CinemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
