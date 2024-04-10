
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/data', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to data database');
})
.catch((err) => {
    console.error('Error connecting to database:', err);
});


// Schema for users of app
const registerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
    dateOfBirth: {
		type: Date,
		require : true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
    password: {
        type: String,
        required: true,
    },
	
});
const User = mongoose.model('users', registerSchema);
User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

	resp.send("App is Working");
	
});

app.post("/register", async (req, resp) => {
	try {
		const user = new User(req.body);
		let result = await user.save();
		result = result.toObject();
		if (result) {
			delete result.password;
			resp.send(req.body);
			console.log(result);
		} else {
			console.log("User already register");
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});
app.listen(5001);
