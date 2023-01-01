import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { connect } from 'socket.io-client';
import { TraceableIoAdapter } from '../libs/traceable-io-adapter';
describe('AppGateway', () => {
  const port = 3000;
  let url;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService, AppGateway],
    }).compile();
    const nestApp = app.createNestApplication();
    nestApp.useWebSocketAdapter(new TraceableIoAdapter(nestApp));
    await nestApp.listen(port);
    url = await nestApp.getUrl();
  });

  describe('root', () => {
    it('should respond with "foo_response"', async () => {
      const client = connect(url, {
        autoConnect: true,
        transports: ['websocket'],
      });
      await new Promise<void>((resolve) => {
        client.on('connect', () => {
          client.emit('foo', 'foo_request_data', (response) => {
            expect(response).toBe('foo_response');
            resolve();
          });
        });
      });
    });
  });
});
