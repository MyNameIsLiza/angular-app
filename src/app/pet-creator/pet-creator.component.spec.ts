import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetCreatorComponent } from './pet-creator.component';

describe('PetCreatorComponent', () => {
  let component: PetCreatorComponent;
  let fixture: ComponentFixture<PetCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
