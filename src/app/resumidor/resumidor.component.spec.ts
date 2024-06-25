import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumidorComponent } from './resumidor.component';

describe('ResumidorComponent', () => {
  let component: ResumidorComponent;
  let fixture: ComponentFixture<ResumidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumidorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
