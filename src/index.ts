import express, { Request, Response } from "express"
const port = 5000
const app = express()

app.get("/",(req:Request,res:Response) => {
  res.send('Alhamdulillah server is running');
})

app.listen(port,()=>{
  console.log(`SERVER RUNNING AT${port}`);
})