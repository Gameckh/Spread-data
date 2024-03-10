const express = require('express');
const http = require('http');
const { initSpreadJS } = require('./src/spreadjs/initSpread');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.static('public'));
app.use('/', require('./src/routes/spreadjs'));

const PORT = process.env.PORT || 3001;
server.listen(PORT, async () => {
  console.log(`SpreadJS-Data Server is running on http://localhost:${PORT}`);
  await initSpreadJS();
  console.log('完成 SpreadJS 初始化');
});
