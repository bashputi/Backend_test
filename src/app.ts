import express, {Request, Response} from 'express';
const app = express()

app.use(express.json());



app.get('/', (req: Request, res: Response) => {
    res.send('Hello Wrold')
  })

export default app;