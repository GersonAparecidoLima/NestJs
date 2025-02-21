import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
     private usuarios: UsuarioEntity[] = [];
    //private usuarios = [];
  
    async salvar(usuario) {
      this.usuarios.push(usuario);
    }
  
    async listar() {
      return this.usuarios;
    }

    async existeComEmail(email: string) {
      const possivelUsuario = this.usuarios.find(
          usuario => usuario.email === email
      );
  
      return possivelUsuario !== undefined;
  }

  
  }