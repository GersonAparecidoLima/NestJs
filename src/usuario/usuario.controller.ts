import {Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from './ListaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {

     //private usuarioRepository = new UsuarioRepository()
     constructor(private usuarioRepository: UsuarioRepository) {}



     @Post()
     async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
     const usuarioEntity = new UsuarioEntity();
     usuarioEntity.email = dadosDoUsuario.email;
     usuarioEntity.senha = dadosDoUsuario.senha;
     usuarioEntity.nome = dadosDoUsuario.nome;
     usuarioEntity.id = uuid();

     this.usuarioRepository.salvar(usuarioEntity);

          return {
               usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
               mensagem: 'usuário criado com sucesso',
          };
     }

 

     @Get()
     async listUsuarios() {
         const usuariosSalvos = await this.usuarioRepository.listar();
         const usuariosLista = usuariosSalvos.map(
             usuario => new ListaUsuarioDTO(
                 usuario.id,
                 usuario.nome
             )
         );
     
         return usuariosLista;
     }

}