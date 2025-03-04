import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutoService } from './Service/produto.service';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    return this.produtoService.criar(dadosProduto);
  }

  @Get()
  async listaTodos() {
    return this.produtoService.listarTodos();
  }

  @Put('/:id')
  async atualiza(@Param('id') id: string, @Body() dadosProduto: AtualizaProdutoDTO) {
    return this.produtoService.atualizar(id, dadosProduto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.produtoService.remover(id);
  }
}
