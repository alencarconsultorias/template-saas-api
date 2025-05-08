import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

// servico para testar conexao com o banco de dados PostgreSQL
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Conexão com PostgreSQL (Prisma) bem-sucedida!');
    } catch (error) {
      console.error('❌ Erro ao conectar ao banco de dados com Prisma:', error);
    }
  }
}