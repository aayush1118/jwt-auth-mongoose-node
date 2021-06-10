const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

var corsOptions = {
	origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

const db = require('./models');
const Role = db.role;

db.mongoose
	.connect(`mongodb://localhost:27017/jwt_node_mongoose_auth`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('successfully connect to MongoDb');
		initial();
	})
	.catch((err) => {
		console.error('Connection error', err);
		process.exit();
	});

const initial = () => {
	Role.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
			new Role({
				name: 'user',
			}).save((err) => {
				if (err) {
					console.log('error', err);
				}
				console.log("added 'user' to roles collection");
			});

			new Role({
				name: 'moderator',
			}).save((err) => {
				if (err) {
					console.log('error', err);
				}

				console.log("added 'moderator' to roles collection");
			});

			new Role({
				name: 'admin',
			}).save((err) => {
				if (err) {
					console.log('error', err);
				}

				console.log("added 'admin' to roles collection");
			});
		}
	});
};
// simple route
app.get('/', (req, res) => {
	res.json({ message: 'This is the application home route.' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
