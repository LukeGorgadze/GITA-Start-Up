const express = require("express")
require('dotenv').config();
const cors = require("cors")
const mongoose = require("mongoose")
const path = require('path')
const authRoutes = require("./routes/AuthRoutes")

const cookieParser = require("cookie-parser")
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
//Up
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("Db connection successfull Dang"))
  .catch(err => {
    console.log(err.message)
  })

  app.use(cors({
    origin: ["http://localhost:3000"],
    method: ["GET","POST"],
    credentials: true
}))


app.use(cookieParser())
app.use(express.json());

app.use("/",authRoutes)

app.use(express.static(path.join(__dirname, "/Client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/Client/build', 'index.html'));
});


// app.use(express.static(path.join(__dirname, "/Client/build")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/Client/build', 'index.html'));
// });

const port_number = (process.env.PORT || 5000);

app.listen(port_number,(req,res) => {
  console.log("server started")

})