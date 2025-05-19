export const config = {
  baseUrlApi: import.meta.env.VITE_BASE_URL_API || 'http://localhost:3000',
  wsProtocol: import.meta.env.VITE_WS_PROTOCOL || 'ws',
  httpProtocol: import.meta.env.VITE_HTTP_PROTOCOL || 'http',
};
