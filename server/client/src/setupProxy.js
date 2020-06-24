const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
	app.use(
		'/auth/google',
		createProxyMiddleware({
			target: 'http://localhost:4000',
			// changeOrigin: true,
		})
	);
	app.use(
		'/auth/facebook',
		createProxyMiddleware({
			target: 'http://localhost:4000',
			// changeOrigin: true,
		})
   );
   app.use(
		'/api/secret',
		createProxyMiddleware({
			target: 'http://localhost:4000',
		})
	);
};
