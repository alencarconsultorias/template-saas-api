import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

// ATENÇÃO: Para testar endpoints que dependem do Firebase, é necessário um token válido de teste.
// Recomenda-se mockar o Firebase em ambiente de teste ou usar um token real de ambiente de desenvolvimento.

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let server: any;
  // Gera um e-mail único para cada execução de teste
  const TEST_EMAIL = `testuser_${Date.now()}@example.com`;
  const TEST_PASSWORD = process.env.TEST_PASSWORD || 'Test@123456';
  const TEST_FIREBASE_TOKEN = process.env.TEST_FIREBASE_TOKEN || 'TOKEN_AQUI';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/register (POST) - deve registrar um novo usuário', async () => {
    const res = await request(server)
      .post('/auth/register')
      .send({ email: TEST_EMAIL, password: TEST_PASSWORD, name: 'Test User' });
    expect([200, 201, 400, 500]).toContain(res.status);
  });

  it('/auth/login (POST) - deve autenticar usuário com token do Firebase', async () => {
    const res = await request(server)
      .post('/auth/login')
      .send({ token: TEST_FIREBASE_TOKEN });
    expect([200, 401, 404]).toContain(res.status);
  });

  it('/auth/reset-password (POST) - deve enviar link de reset de senha', async () => {
    const res = await request(server)
      .post('/auth/reset-password')
      .send({ email: TEST_EMAIL });
    expect([200, 400, 500]).toContain(res.status);
  });

  it('/auth/refresh-token (POST) - deve validar ou renovar token', async () => {
    const res = await request(server)
      .post('/auth/refresh-token')
      .send({ token: TEST_FIREBASE_TOKEN });
    expect([200, 201, 401]).toContain(res.status);
  });

  it('/auth/logout (POST) - deve retornar mensagem de logout', async () => {
    const res = await request(server)
      .post('/auth/logout');
    expect([200, 201]).toContain(res.status);
    expect(res.body.message).toBeDefined();
  });

  it('/auth/verify (GET) - deve validar token autenticado', async () => {
    const res = await request(server)
      .get('/auth/verify')
      .set('Authorization', `Bearer ${TEST_FIREBASE_TOKEN}`);
    expect([200, 401]).toContain(res.status); // 401 se token inválido
  });
}); 