import { IncomingMessage, ServerResponse } from 'http';
import type { Middleware } from './types';

class Router {
  private routes: { method: string; path: string; handler: Middleware }[] = [];

  constructor() {
    console.log('Router created.');
  }

  /** Register a middleware function. */
  use(method: string, path: string, middleware: Middleware): void {
    this.routes.push({ method, path, handler: middleware });
  }

  /** Register a GET handler. */
  get(path: string, handler: Middleware): void {
    this.use('GET', path, handler);
  }

  /** Register a POST handler. */
  post(path: string, handler: Middleware): void {
    this.use('POST', path, handler);
  }

  /** Register a PUT handler. */
  put(path: string, handler: Middleware): void {
    this.use('PUT', path, handler);
  }

  /** Register a DELETE handler. */
  delete(path: string, handler: Middleware): void {
    this.use('DELETE', path, handler);
  }

  generateHandler(): (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void
  ) => void {
    return (req: IncomingMessage, res: ServerResponse, next: () => void) => {
      const callRoute = (index: number) => {
        if (index < this.routes.length) {
          const route = this.routes[index];
          if (req.method === route.method && req.url === route.path) {
            route.handler(req, res, () => callRoute(index + 1));
          } else {
            callRoute(index + 1);
          }
        }
        next();
      };
      callRoute(0);
    };
  }
}

export default Router;
