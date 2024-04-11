const config =  require('../config/config');
import express, { Request, Response } from 'express';
import userRouter from './routes/user.router'
import authRouter from './routes/auth.router'
import roleRouter from './routes/role.router'
import productRouter from './routes/product.router'
import orderRouter from './routes/order.router'

import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(roleRouter);
app.use(userRouter);
app.use(orderRouter);
app.use(authRouter);
app.use(productRouter);
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World !!');
});

app.listen(config.PORT, config.HOST, () => {
    console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
})