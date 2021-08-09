import Ws from '@adonisjs/websocket-client';
import {WS_URL} from '@env';

export class SocketConnection {
  connect(token) {
    if (token) {
      // this.ws = Ws('wss://carolina.g3infotech.app')
      this.ws = Ws(`${WS_URL}`).withApiToken(token).connect();

      this.ws.on('open', () => {
        console.log('Connection initialized');
      });

      this.ws.on('close', () => {
        console.log('Connection closed');
      });

      return this;
    }
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }

  subscribe(channel, handler) {
    try {
      if (!this.ws) {
        setTimeout(() => this.subscribe(channel, handler), 1000);
      } else {
        const hasInstance = this.ws.getSubscription(channel);
        if (!hasInstance) {
          const result = this.ws.subscribe(channel);

          result.on('message', message => {
            console.log(`Incoming - ${channel}`, message);
            handler({...message, channel: channel});
          });

          result.on('error', error => {
            console.error('error_subscription: ', error);
          });

          result.on('close', () => console.log(`${channel} - closed`));

          console.log(result);
          return result;
        }

        if (hasInstance) {
          return hasInstance;
        }
      }
    } catch (err) {
      console.log('error_subscribe: ', err);
    }
  }

  unsubscribe(channel) {
    try {
      const result = this.ws.getSubscription(channel);
      if (result) {
        result.close();
      }
    } catch (error) {
      console.log('unsubscribe_error: ', error);
    }
  }
}

export default new SocketConnection();
