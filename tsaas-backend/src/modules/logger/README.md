# Winston Logger Implementation

## Visão Geral

O Winston foi implementado como um módulo genérico e reutilizável no projeto TSAAS-API. O logger oferece múltiplos transportes, formatação consistente e pode ser usado tanto com o Logger padrão do NestJS quanto com o CustomLoggerService personalizado.

## Configuração

### Transportes Configurados

1. **Console**: Logs formatados com cores e timestamp
2. **Arquivo de Erros**: Apenas logs de erro em `logs/error.log`
3. **Arquivo Combinado**: Todos os logs em `logs/combined.log`

### Configuração Global

O logger está configurado globalmente no `main.ts` e todos os logs (tanto do Logger padrão quanto do CustomLoggerService) são processados pelo Winston.

## Como Usar

### Opção 1: Logger Padrão do NestJS (Recomendado para uso simples)

#### Em Serviços
```typescript
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MeuService {
  private readonly logger = new Logger(MeuService.name);

  meuMetodo() {
    this.logger.log('Mensagem de info', 'meuMetodo');
    this.logger.error('Erro ocorreu', 'stack trace', 'meuMetodo');
    this.logger.warn('Aviso importante', 'meuMetodo');
    this.logger.debug('Debug info', 'meuMetodo');
  }
}
```

#### Em Controllers
```typescript
import { Controller, Logger } from '@nestjs/common';

@Controller('exemplo')
export class ExemploController {
  private readonly logger = new Logger(ExemploController.name);

  @Get()
  getExemplo() {
    this.logger.log('Endpoint chamado', 'getExemplo');
    return 'exemplo';
  }
}
```

### Opção 2: CustomLoggerService (Recomendado para uso avançado)

#### 1. Importar o LoggerModule no seu módulo

```typescript
// user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [PrismaModule, LoggerModule], // Importar o LoggerModule
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

#### 2. Usar o CustomLoggerService no seu serviço

```typescript
// user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CustomLoggerService } from '../logger/logger.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: CustomLoggerService, // Injetar o CustomLoggerService
  ) {}
  
  async findOrCreateByFirebaseUid(firebaseUid: string, email: string, name: string) {
    this.logger.log(`Finding or creating user by Firebase UID: ${firebaseUid}`, 'findOrCreateByFirebaseUid');
    
    let user = await this.prisma.user.findUnique({ where: { firebaseUid } });
    if (!user) {
      this.logger.log(`Creating new user for Firebase UID: ${firebaseUid}`, 'findOrCreateByFirebaseUid');
      user = await this.prisma.user.create({
        data: { firebaseUid, email, name },
      });
    } else {
      this.logger.log(`User found for Firebase UID: ${firebaseUid}`, 'findOrCreateByFirebaseUid');
    }
    return user;
  }

  create(data: CreateUserDto) {
    this.logger.log(`Creating new user: ${data.email}`, 'create');
    return this.prisma.user.create({ 
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  findAll() {
    this.logger.log('Finding all users', 'findAll');
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    this.logger.log(`Finding user by id: ${id}`, 'findOne');
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateUserDto) {
    this.logger.log(`Updating user by id: ${id}`, 'update');
    return this.prisma.user.update({ where: { id }, data });
  }

  remove(id: number) {
    this.logger.log(`Deleting user by id: ${id}`, 'remove');
    return this.prisma.user.delete({ where: { id } });
  }
}
```

## Níveis de Log

### Métodos Disponíveis

```typescript
// Logs de informação
this.logger.log('Mensagem de info', 'contexto');

// Logs de erro
this.logger.error('Mensagem de erro', 'stack trace', 'contexto');

// Logs de aviso
this.logger.warn('Mensagem de aviso', 'contexto');

// Logs de debug
this.logger.debug('Mensagem de debug', 'contexto');

// Logs verbosos
this.logger.verbose('Mensagem detalhada', 'contexto');
```

### Descrição dos Níveis

- `log()` - Informações gerais
- `error()` - Erros e exceções
- `warn()` - Avisos
- `debug()` - Informações de debug
- `verbose()` - Informações detalhadas

## Arquivos de Log

- `logs/error.log` - Apenas erros
- `logs/combined.log` - Todos os logs
- Console - Logs formatados com cores

## Vantagens do CustomLoggerService

- **Consistência**: Todos os logs seguem o mesmo formato
- **Contexto**: Facilita a identificação de onde o log foi gerado
- **Flexibilidade**: Pode ser facilmente estendido com métodos customizados
- **Reutilização**: Pode ser usado em qualquer módulo da aplicação
- **Injeção de Dependência**: Segue os padrões do NestJS

## Configuração Avançada

Para modificar a configuração, edite `logger.config.ts`:

```typescript
export const loggerConfig = {
  level: process.env.LOG_LEVEL || 'info', // Define nível mínimo
  transports: [
    // Seus transportes aqui
  ],
};
```

## Estrutura do Módulo

```
src/logger/
├── logger.module.ts      # Módulo principal que exporta WinstonModule e CustomLoggerService
├── logger.service.ts     # CustomLoggerService personalizado
├── logger.config.ts      # Configuração do Winston
└── README.md            # Esta documentação
```

## Quando Usar Cada Opção

### Use o Logger Padrão do NestJS quando:
- Precisa de logging simples e rápido
- Não precisa de funcionalidades customizadas
- Quer usar o logger diretamente sem injeção de dependência

### Use o CustomLoggerService quando:
- Precisa de consistência em toda a aplicação
- Quer funcionalidades customizadas
- Prefere usar injeção de dependência
- Precisa de logs mais estruturados com contexto 