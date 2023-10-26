const express = require('express');
const app = express();
const router = require('./router');
const path = require('path');
const PORT = process.env.PORT || 2000;
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const databaseRouter = require("./databaseRoutes/databaseRouter");
const cookieParser = require('cookie-parser');

app.use(cors());

const limiter = rateLimit({
    windowMs: 1000,
    max:1000,
});

app.use(limiter);

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public/build')));

app.use("/api", router);
app.use("/database", databaseRouter);


app.listen(PORT, () => {
    console.log(`The server is live at http://localhost:${PORT}`);
});
