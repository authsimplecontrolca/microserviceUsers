import express, { Request, Response, NextFunction } from 'express';
import { connectDB } from './config/database';
import { router } from './routes/routes';
import { config } from './utils/config';
import { errorHandler, noFoundHandler } from './utils/bodyResponseApi';

const app = express();
const PORT = config.PORT;

// Middlewares
app.use(express.json()); // Para JSON

// Rutas principales
app.use('/api/user', router);

// Ruta por defecto
app.get('/api', (req: Request, res: Response) => {
  res.send('🚀 Microservicio user está ON');
});

// Ruta no encontrada (404)
app.use(noFoundHandler);

// Middleware de errores
app.use(errorHandler);

// Iniciar servidor
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
