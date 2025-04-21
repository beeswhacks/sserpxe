import { IncomingMessage, ServerResponse } from 'node:http';
import type { Middleware } from './types';
declare class App {
    private middlewares;
    /** Register a middleware function. */
    use: (middleware: Middleware) => void;
    /** Run all middlewares sequentially. */
    runMiddlewares: (req: IncomingMessage, res: ServerResponse) => void;
    /** Start the server. */
    listen(port: number, callback: () => void): void;
}
export default App;
