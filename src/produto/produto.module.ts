import { Module } from '@nestjs/common';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './Service/produto.service';
import { ProdutoRepository } from './produto.repository';

@Module({
  imports: [UsuarioModule],
  controllers: [ProdutoController],
  providers: [ProdutoRepository,ProdutoService],
  exports: [ProdutoService],
})
export class ProdutoModule {}
