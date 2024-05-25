import express, {NextFunction, Request, Response} from 'express';
import { ProductRoutes } from "./modules/products/product.route";
import { OrderRoutes } from "./modules/order/order.route";
const app = express()

app.use(express.json());

app.use("/api", ProductRoutes);
app.use("/api", OrderRoutes);

// route not found error 
app.use((req, res, next) => {
  res.json({
    success:false,
    message: "Route not found"
  });
});

// internal server error 
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.json({
    success: false,
    message: "An internal server error occurred.",
    err: err.message
  })
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Wrold')
  })

export default app;