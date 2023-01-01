import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TraceableIoAdapter } from '../libs/traceable-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new TraceableIoAdapter(app));
  await app.listen(3000);
}
bootstrap();
