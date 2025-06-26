# Winston Logger Implementation

## Configuração

O Winston foi implementado de forma objetiva e direta no projeto com as seguintes características:

### Transportes Configurados

1. **Console**: Logs formatados com cores e timestamp
2. **Arquivo de Erros**: Apenas logs de erro em `logs/error.log`
3. **Arquivo Combinado**: Todos os logs em `logs/combined.log`

### Como Usar

#### 1. Em Serviços (Recomendado)
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

#### 2. Em Controllers
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

#### 3. Usando o CustomLoggerService
```typescript
import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from './logger/logger.service';

@Injectable()
export class MeuService {
  constructor(private readonly logger: CustomLoggerService) {}

  meuMetodo() {
    this.logger.log('Mensagem', 'contexto');
    this.logger.error('Erro', 'trace', 'contexto');
  }
}
```

### Níveis de Log

- `log()` - Informações gerais
- `error()` - Erros e exceções
- `warn()` - Avisos
- `debug()` - Informações de debug
- `verbose()` - Informações detalhadas

### Arquivos de Log

- `logs/error.log` - Apenas erros
- `logs/combined.log` - Todos os logs
- Console - Logs formatados com cores

### Configuração Avançada

Para modificar a configuração, edite `logger.config.ts`:

```typescript
export const loggerConfig = {
  level: process.env.LOG_LEVEL || 'info', // Define nível mínimo
  transports: [
    // Seus transportes aqui
  ],
};
``` 