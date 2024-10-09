// Импорт необходимых модулей
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Инициализация приложения Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Подключено к MongoDB'))
.catch((err) => console.error('Ошибка подключения к MongoDB:', err));

// Настройка Socket.IO
io.on('connection', (socket) => {
  console.log('Новый клиент подключен');
  
  socket.on('disconnect', () => {
    console.log('Клиент отключился');
  });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));