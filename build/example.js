import Router from "./router.js";
import App from "./app.js";
const router = new Router();
router.get('/hello', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello');
    res.write(' ');
    next();
});
router.get('/hello', (req, res, next) => {
    res.statusCode = 200;
    res.write('World\n');
    res.end();
    next();
});
router.get('/goodbye', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Goodbye\n');
    next();
});
const app = new App();
app.use(router.generateHandler());
app.listen(3000, () => console.log('Listening on port 3000'));
//# sourceMappingURL=example.js.map