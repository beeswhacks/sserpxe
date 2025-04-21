import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import type { Middleware } from './types';

class App {
  private middlewares: Middleware[] = [];

  /** Register a middleware function. */
  use = (middleware: Middleware): void => {
    this.middlewares.push(middleware);
  };

  /** Run all middlewares sequentially. */
  runMiddlewares = (req: IncomingMessage, res: ServerResponse): void => {
    const runOne = (index: number) => {
      if (index < this.middlewares.length) {
        console.log(`Running ${index}`);
        this.middlewares[index](req, res, () => runOne(index + 1));
      }
    };
    runOne(0);
  };

  /** Start the server. */
  listen(port: number, callback: () => void): void {
    const server = createServer(this.runMiddlewares);
    server.listen(port, callback);
  }
}

export default App;
