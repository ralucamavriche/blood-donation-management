const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const expressHbs = require("express-handlebars");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

//Bodyparser Middleware
app.use(express.json());
app.engine(
  "hbs",
  expressHbs({
    extname: "hbs",
    defaultLayout: "",
    layoutsDir: "",
  })
);

app.set("view engine", "hbs");

// DB Config
const db = config.get("mongooseURI");

//Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(express.static('client/build'));

app.use("/api/email", require("./routes/api/email"));
app.use("/api/donors", require("./routes/api/donors"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/request", require("./routes/api/request"));
app.use("/api/appointment", require("./routes/api/appointment"));
app.use("/api/feedback", require("./routes/api/feedback"));
app.use("/api/question", require("./routes/api/question"));

app.use(function(req, res) {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(port, () => console.log(`Server started on port ${port}`));

