import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCadastroComponent } from './delete-cadastro.component';

describe('DeleteCadastroComponent', () => {
  let component: DeleteCadastroComponent;
  let fixture: ComponentFixture<DeleteCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
