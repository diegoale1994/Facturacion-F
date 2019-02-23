import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente'
import {ClienteService} from './cliente.service'
import {Router, ActivatedRoute} from '@angular/router'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private cliente: Cliente = new Cliente();
  private titulo: string = "Crear Cliente";
  private errores:string[];
  constructor(private ClienteService: ClienteService,
    private router: Router,
  private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.ActivatedRoute.params.subscribe(params =>{
      let id = params['id']

      if (id) {
        this.ClienteService.getCliente(id).subscribe( (cliente)=> this.cliente = cliente)
      }

    })

  }

 create(): void {
    this.ClienteService.create(this.cliente)
    .subscribe(json => {
        this.router.navigate(['/clientes'])
        Swal('Nuevo Cliente', `Cliente ${json.cliente.nombre} creado con exito!`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error("codigo del error desde el backend "+ err.status)
      console.error(err.error.errors);
    }
  );
  }

  update():void{
    this.ClienteService.update(this.cliente)
    .subscribe(json =>{
        this.router.navigate(['/clientes'])
        Swal('Cliente Actuaizado',`Cliente ${json.cliente.nombre} Actualizado correctamente`,'success')
      },
      err => {
        this.errores = err.error.errrors as string[];
        console.error("codigo del error desde el backend "+ err.status)
        console.error(err.error.errors);
      }

    )
  }

}