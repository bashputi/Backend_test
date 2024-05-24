import express, {Request, Response} from 'express';
import { ProductRoutes } from "./modules/products/product.route";
const app = express()

app.use(express.json());

app.use("/api/products", ProductRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Wrold')
  })

export default app;