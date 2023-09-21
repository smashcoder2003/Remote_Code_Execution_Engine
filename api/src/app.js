const express = require('express');
const app = express();
const router = require('./router');
const path = require('path');
const PORT = process.env.PORT || 2000;
const rateLimit = require("express-rate-limit");
const cors = require('cors');
app.use(cors());

const limiter = rateLimit({
    windowMs: 1000,
    max:1000,
});

app.use(limiter);

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`The server is live at http://localhost:${PORT}`);
});
