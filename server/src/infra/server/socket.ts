import http from 'http';
import { Server } from 'socket.io';

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`user conected on id ${socket.id}`);
});

export { httpServer };
