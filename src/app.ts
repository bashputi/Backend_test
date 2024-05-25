import express, {Request, Response} from 'express';
import { ProductRoutes } from "./modules/products/product.route";
import { OrderRoutes } from "./modules/order/order.route";
const app = express()

app.use(express.json());

app.use("/api", ProductRoutes);
app.use("/api", OrderRoutes);


app.get('/', (req: Request, res: Response) => {
    res.send('Hello Wrold')
  })

export default app;