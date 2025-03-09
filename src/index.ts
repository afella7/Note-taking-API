import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import noteRoutes from './routes/noteRoutes';
import { errorMiddleware } from './middleware/errorHandler';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(errorMiddleware);


mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.use('/api', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

