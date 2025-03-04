import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProdutoRepository } from '../produto.repository';
import { ProdutoEntity } from '../produto.entity';
import { CriaProdutoDTO } from '../dto/CriaProduto.dto';
import { AtualizaProdutoDTO } from '../dto/atualizaProduto.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ProdutoService {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async criar(dadosProduto: CriaProdutoDTO) {
    const produto = new ProdutoEntity();

    produto.id = randomUUID();
    produto.nome = dadosProduto.nome;
    produto.usuarioId = dadosProduto.usuarioId;
    produto.valor = dadosProduto.valor;
    produto.quantidade = dadosProduto.quantidade;
    produto.descricao = dadosProduto.descricao;
    produto.categoria = dadosProduto.categoria;
    produto.caracteristicas = dadosProduto.caracteristicas;
    produto.imagens = dadosProduto.imagens;

    await this.produtoRepository.salva(produto);
    return produto;
  }

  async listarTodos() {
    return this.produtoRepository.listaTodos();
  }

  async atualizar(id: string, dadosProduto: AtualizaProdutoDTO) {
    const produtoExistente = await this.produtoRepository.buscaPorId(id);
    if (!produtoExistente) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    return this.produtoRepository.atualiza(id, dadosProduto);
  }

  async remover(id: string) {
    const produtoExistente = await this.produtoRepository.buscaPorId(id);
    if (!produtoExistente) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    return this.produtoRepository.remove(id);
  }
}
