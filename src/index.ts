import express, { Request, Response, NextFunction } from 'express';
import { connectDB } from './config/database';
import { router } from './routes/routes';
import { config } from './utils/config';

const app = express();
const PORT = config.PORT;

// Middlewares
app.use(express.json()); // Para JSON
// app.use(morgan('dev')); // Para logs de peticiones (opcional)

// Rutas principales
app.use('/api/user', router);

// Ruta por defecto
app.get('/api', (req:Request, res:Response) => {
  res.send('🚀 Microservicio user está ON');
});

// Ruta no encontrada (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    message: 'Ruta no encontrada', 
    requestedRoute: req.originalUrl // Aquí se agrega la ruta solicitada
  });
});


// Middleware de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar servidor
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
