
import express from 'express'
const app = express()
import cors from "cors";
import dotenv from 'dotenv';
const port = process.env.PORT || 5000;
import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import connectDb from './config/db.js'
dotenv.config();

connectDb()

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json())

app.use(express.urlencoded({ extended: true }))




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/user',userRoutes)
app.use('/api/task',taskRoutes)

app.use((err, req, res, next) => {
  if (err) {
    console.error(err.stack); 
    res.status(500).json({ error: "Server error" });
  } else {
    next();
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})