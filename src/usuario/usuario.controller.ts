import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { UsuarioService } from './Service/usuarioService';
import { UsuarioEntity } from './usuario.entity';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';


@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async criar(@Body() dadosUsuario: CriaUsuarioDTO) { 
    return this.usuarioService.criar(dadosUsuario);
  }

  @Get()
  async listar() {
    return this.usuarioService.listar();
  }

  @Put(':id')
  async atualizar(@Param('id') id: string, @Body() dadosDeAtualizacao: Partial<UsuarioEntity>) {
    return this.usuarioService.atualizar(id, dadosDeAtualizacao);
  }

  @Delete(':id')
  async remover(@Param('id') id: string) {
    return this.usuarioService.remover(id);
  }
    
}
