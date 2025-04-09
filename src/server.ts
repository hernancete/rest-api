import app from './app';

const API_PORT = parseInt(process.env.API_PORT || '8080');
const port = isNaN(API_PORT) ? 8080 : API_PORT;

app.listen(port);
