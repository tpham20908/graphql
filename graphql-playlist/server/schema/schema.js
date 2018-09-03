const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");
const Shipment = require("../models/shipment");

const { 
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList
} = graphql;

// dummy data
/*
var books = [
	{name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1"},
	{name: "The final Empire", genre: "Fantasy", id: "2", authorId: "2"},
	{name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3"},
	{name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2"},
	{name: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "3"},
	{name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "3"}
];

var authors = [
	{name: "Patrick Rothfuss", age: 44, id: "1"},
	{name: "Brandon Sanderson", age: 42, id: "2"},
	{name: "Terry Pratchett", age: 66, id: "3"}
];

var shipments = [
	{id: "1", senderName: "sender #1", receiverName: "receiver #1"},
	{id: "2", senderName: "sender #2", receiverName: "receiver #2"},
	{id: "3", senderName: "sender #3", receiverName: "receiver #3"},
];
*/

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				// return _.find(authors, {id: parent.authorId});
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// return _.filter(books, {authorId: parent.id});
			}
		}
	})
});

const ShipmentType = new GraphQLObjectType({
	name: "Shipment",
	fields: () => ({
		id: { type: GraphQLID },
		senderName: { type: GraphQLString },
		receiverName: { type: GraphQLString }
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get data from db / other source
				// return _.find(books, {id: args.id});
			}
		},
		author: {
			type: AuthorType,
			args: { id: {type: GraphQLID}},
			resolve(parent, args) {
				// return _.find(authors, {id: args.id});
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// return books;
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				// return authors;
			}
		},
		shipment: {
			type: ShipmentType,
			args: { id: {type: GraphQLID}},
			resolve(parent, args) {
				// return _.find(shipments, {id: args.id});
			}
		},
		shipments: {
			type: new GraphQLList(ShipmentType),
			resolve(parent, args) {
				// return shipments;
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: {type: GraphQLString},
				age: {type: GraphQLInt}
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age
				});
				return author.save();
			}
		},
		addShipment: {
			type: ShipmentType,
			args: {
				senderName: {type: GraphQLString},
				receiverName: {type: GraphQLString}
			},
			resolve(parent, args) {
				let shipment = new Shipment({
					senderName: args.senderName,
					receiverName: args.receiverName
				});
				return shipment.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});