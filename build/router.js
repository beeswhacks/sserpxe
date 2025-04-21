class Router {
    routes = [];
    constructor() {
        console.log('Router created.');
    }
    /** Register a middleware function. */
    use(method, path, middleware) {
        this.routes.push({ method, path, handler: middleware });
    }
    /** Register a GET handler. */
    get(path, handler) {
        this.use('GET', path, handler);
    }
    /** Register a POST handler. */
    post(path, handler) {
        this.use('POST', path, handler);
    }
    /** Register a PUT handler. */
    put(path, handler) {
        this.use('PUT', path, handler);
    }
    /** Register a DELETE handler. */
    delete(path, handler) {
        this.use('DELETE', path, handler);
    }
    generateHandler() {
        return (req, res, next) => {
            const callRoute = (index) => {
                if (index < this.routes.length) {
                    const route = this.routes[index];
                    if (req.method === route.method && req.url === route.path) {
                        route.handler(req, res, () => callRoute(index + 1));
                    }
                    else {
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
//# sourceMappingURL=router.js.map