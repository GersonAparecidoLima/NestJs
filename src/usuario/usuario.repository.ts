import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];
  

  async salvar(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    this.usuarios.push(usuario);
    return usuario;  // Retorne o usuário que foi salvo
  }

  async listar() {
    return this.usuarios;
  }

  async existeComEmail(email: string): Promise<boolean> {
    return this.usuarios.some((usuario) => usuario.email === email);
  }

  private buscaPorId(id: string): UsuarioEntity {
    const usuario = this.usuarios.find((usuarioSalvo) => usuarioSalvo.id === id);

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    return usuario;
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    if (Object.keys(dadosDeAtualizacao).length === 0) {
      throw new BadRequestException('Dados de atualização não podem estar vazios.');
    }

    const usuario = this.buscaPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave !== 'id') {
        usuario[chave] = valor;
      }
    });

    return usuario;
  }

  async remove(id: string) {
    const usuario = this.buscaPorId(id);

    this.usuarios = this.usuarios.filter((usuarioSalvo) => usuarioSalvo.id !== id);

    return {
      message: `Usuário com ID ${id} removido com sucesso.`,
      usuario
    };
  }
    
}
