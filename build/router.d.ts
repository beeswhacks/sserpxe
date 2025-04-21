import { IncomingMessage, ServerResponse } from 'http';
import type { Middleware } from './types';
declare class Router {
    private routes;
    constructor();
    /** Register a middleware function. */
    use(method: string, path: string, middleware: Middleware): void;
    /** Register a GET handler. */
    get(path: string, handler: Middleware): void;
    /** Register a POST handler. */
    post(path: string, handler: Middleware): void;
    /** Register a PUT handler. */
    put(path: string, handler: Middleware): void;
    /** Register a DELETE handler. */
    delete(path: string, handler: Middleware): void;
    generateHandler(): (req: IncomingMessage, res: ServerResponse, next: () => void) => void;
}
export default Router;
