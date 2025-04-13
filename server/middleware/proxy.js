import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineEventHandler(async (event) => {

    if (event.node.req.url?.startsWith('/api')) {
        const proxy = createProxyMiddleware({
            target: 'http://backend:8080',
            changeOrigin: false,
            secure: false,
        });

        // Verwerk de proxy-middleware
        return new Promise((resolve, reject) => {
            proxy(event.node.req, event.node.res, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
});