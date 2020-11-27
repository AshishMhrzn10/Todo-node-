var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Connect to the database
mongoose.connect(
	"mongodb+srv://test:test@todo.qod4w.mongodb.net/todo?retryWrites=true&w=majority",
	{ useNewUrlParser: true }
);

//Create a schema - this is like a blueprint

var todoSchema = new mongoose.Schema({
	item: String,
});

var Todo = mongoose.model("Todo", todoSchema);
var itemOne = Todo({ item: "buy flowers" }).save(function (err) {
	if (err) throw err;
	console.log("item saved");
});

var data = [
	{ item: "Eat" },
	{ item: "Sleep" },
	{ item: "Code" },
	{ item: "Repeat" },
];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
	app.get("/todo", function (req, res) {
		res.render("todo", { todos: data });
	});

	app.post("/todo", urlencodedParser, function (req, res) {
		data.push(req.body);
		res.json({ todos: data });
	});

	app.delete("/todo/:item", function (req, res) {
		data = data.filter(function (todo) {
			return todo.item.replace(/ /g, "-") !== req.params.item;
		});
		res.json({ todos: data });
	});
};
