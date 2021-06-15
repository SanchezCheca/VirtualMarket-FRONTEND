import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  users: any[] = [];
  crudForm: FormGroup;
  editando = false;
  message: any;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private crudService: CrudService) {
    this.message = "";

    this.crudForm = this.formBuilder.group({
      id: [],
      name: [],
      email: [],
      rol: [],
      balance: []
    });
  }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.crudService.getAllUsersData().subscribe(
      (response: any) => {
        this.users = response.message;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    if (this.crudForm.invalid) {
      return;
    }
    let userData = this.crudForm.value;
    const id = userData.id;
    const name = userData.name;
    const email = userData.email;
    const rol = userData.rol;
    const balance = userData.balance;

    this.crudService.updateUser(id, name, email, rol, balance).subscribe(
      (response: any) => {
        this.message = response.message;
        this.quitarMensajeYCargar();
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.editando = false;
  }

  quitarMensajeYCargar() {
    setTimeout(() => {
      this.message = '';
      this.cargar();
    }, 1000);
  }

  editar(id: any, name: any, email: any, rol: any, balance: any) {
    this.editando = true;
    this.crudForm = this.formBuilder.group({
      id: [id],
      name: [name],
      email: [email],
      rol: [rol],
      balance: [balance]
    });
  }

  eliminar(id: any) {
    this.crudService.removeUser(id).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.message = 'Se ha eliminado';
    this.quitarMensajeYCargar();
  }

}
