var bodyParser = require("body-parser");
const { request } = require("http");
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

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
	app.get("/todo", function (req, res) {
		Todo.find({}, function (err, data) {
			if (err) throw err;
			res.render("todo", { todos: data });
		});
	});

	app.post("/todo", urlencodedParser, function (req, res) {
		var newTodo = Todo(req.body).save(function (err, data) {
			if (err) throw err;
			res.json({ todos: data });
		});
	});

	app.delete("/todo/:item", function (req, res) {
		Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function (
			err,
			data
		) {
			if (err) throw err;
			res.json({ todos: data });
		});
	});
};
