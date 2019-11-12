const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function() {
	console.log('server running on port 3000')
})

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/show', (req, res) => {
	console.log(req.body)
})