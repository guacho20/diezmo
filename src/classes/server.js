import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import authRoutes from '../routes/auth.routes';
import indexRoutes from '../routes/index.routes';
import membersRoutes from '../routes/members.routes';
import optionsRoutes from '../routes/options.routes';
import rolsRoutes from '../routes/rols.routes';
import usersRoutes from '../routes/users.routes';

require('dotenv').config();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/api', indexRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/members', membersRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/options', optionsRoutes);
app.use('/api/rols', rolsRoutes);

export default app;