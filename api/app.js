const express = require('express')
const cors = require('cors')
const connectDB = require('./configs/dbConn');
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

// connectDB();

app.use(require("./routes/routes"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})