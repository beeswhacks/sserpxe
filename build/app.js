import { createServer } from 'node:http';
class App {
    middlewares = [];
    /** Register a middleware function. */
    use = (middleware) => {
        this.middlewares.push(middleware);
    };
    /** Run all middlewares sequentially. */
    runMiddlewares = (req, res) => {
        const runOne = (index) => {
            if (index < this.middlewares.length) {
                this.middlewares[index](req, res, () => runOne(index + 1));
            }
        };
        runOne(0);
    };
    /** Start the server. */
    listen(port, callback) {
        const server = createServer(this.runMiddlewares);
        server.listen(port, callback);
    }
}
export default App;
//# sourceMappingURL=app.js.map