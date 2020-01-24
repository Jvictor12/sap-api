// Import express
let express = require('express')
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialize the app
let app = express();

// Import routes
let apiRoutes = require('./api-routes')
// Configure bodypraser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb+srv://iago:u98eZ.yYXDjVt@N@iago-wade7.mongodb.net/test?retryWrites=true&w=majority', 
	{dbName: 'sap', useNewUrlParser: true})
	.catch(error => console.log(error));
var db = mongoose.connection;

// Added check for DB connection
if (!db) {
	console.log('Error connecting db')
} else {
	console.log('Db connected successfully')
}

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req,res) => res.send('Hello World from SAP API'));

// Use Api routes in the App
app.use('/api', apiRoutes)
// Launch app to listen to specified port
app.listen(port, function() {
	console.log('Running SAP REST on port ' + port);
});