import { Injectable } from '@angular/core';
import { Usuario, Usuario2 } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, SECRET_KEY } from '../../config/config';
import * as swal from 'sweetalert';
import swal2 from 'sweetalert2';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  usuario2: any;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
   // return ( this.token.length > 5 ) ? true : false;

   if ( this.token.length > 5 ) {
     return true;
   } else {
     return false;
   }
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStoragelogin( id: string, token: string, usuario: Usuario, email: string, expiratoken: string ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    localStorage.setItem('emailuser', email );
    localStorage.setItem('expiratoken', expiratoken);

    this.usuario = usuario;
    this.token = token;
  }

  logout() {

    swal2.fire({
      title: 'Cerrar Sesion?',
      text: `Se cerrara la sesion actual`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }). then ( resp => {
      if ( resp.value) {

        this.usuario = null;
        this.token = '';
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('id');
        localStorage.removeItem('emailuser');
        localStorage.removeItem('expiratoken');
        this.router.navigate(['/login']);
        swal2.fire(
          'Terminó la sesion',
          'Correctamente',
          'info'
                  );
      }
    });

  }

  login( usuario: any, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    }else {
      localStorage.removeItem('email');
    }

  /*  let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
                .map( (resp: any) => {

                  this.guardarStorage( resp.id, resp.token, resp.usuario );

                  return true;
                });
  */
 let url = URL_SERVICIOS + '/authenticate?auth[email]=' +
 usuario.email + '&auth[password]=' + usuario.password + '&secret_key=' + SECRET_KEY;

  return this.http.get( url )
                .map( (resp: any) => {

                  console.log(resp.data.attributes.id);
                  console.log(resp.data.token);
                  console.log(resp.data.attributes.email);

                  this.guardarStoragelogin( resp.data.attributes.id,
                                            resp.data.token,
                                            resp.data.attributes.name,
                                            resp.data.attributes.email,
                                            resp.data.expires_at );

                  return true;
                });


  }


  crearUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
              .map( (resp: any) => {

                swal('Usuario creado', usuario.email, 'success' );
                return resp.usuario;
              });
  }








 /* loginGoogle( token: string ) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } )
                .map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.usuario );
                  return true;
                });


  } */

}
