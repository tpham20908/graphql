const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();

// connect to mlab database
// mongoose.connect('mongodb://localhost:27017/myapp');
mongoose.connect("mongodb://test:Dicom-1234@ds141952.mlab.com:41952/graphql-api");
mongoose.connection.once("open", () => {
	console.log("Connected to db");
});

app.use("/graphql", graphqlHTTP({
	schema,
	graphiql: true
}));

app.listen(4000, () => {
	console.log("Now listening for request on port 4000...");
});