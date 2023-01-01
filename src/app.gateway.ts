import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Ack, RequestId } from '../libs/traceable-io-adapter';

@WebSocketGateway({
  transports: ['websocket'],
})
export class AppGateway {
  @SubscribeMessage('foo')
  fooHandler(
    @ConnectedSocket() client,
    @MessageBody() body,
    @Ack() ack,
    @RequestId() requestId,
  ) {
    console.log(
      `[${requestId}] - From client [${client.id}]: [${body.toString()}]`,
    );
    ack('foo_response');
  }
}
