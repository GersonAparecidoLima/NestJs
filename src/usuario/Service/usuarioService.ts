import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsuarioRepository } from '../usuario.repository';
import { UsuarioEntity } from '../usuario.entity';
import { CriaUsuarioDTO } from '../dto/CriaUsuario.dto';
import { randomUUID } from 'crypto'; // Importando o método para gerar UUID

@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}


  async criar(dadosUsuario: CriaUsuarioDTO): Promise<UsuarioEntity> {
   
    const usuario = new UsuarioEntity();
    
    // Gerando o ID automaticamente
    usuario.id = randomUUID();  
    usuario.nome = dadosUsuario.nome;
    usuario.email = dadosUsuario.email;
    usuario.senha = dadosUsuario.senha;

    // Salvando o usuário no repositório
    return this.usuarioRepository.salvar(usuario);
  }
  
  async listar() {
    return this.usuarioRepository.listar();
  }

  async atualizar(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    if (Object.keys(dadosDeAtualizacao).length === 0) {
      throw new BadRequestException('Dados de atualização não podem estar vazios.');
    }

    return this.usuarioRepository.atualiza(id, dadosDeAtualizacao);
  }

  async remover(id: string) {
    return this.usuarioRepository.remove(id);
  }
    
}
