const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

// fix connection.js for server use front and backend.

app.set("port", process.env.PORT || 4000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Controllers --------------------

const ProjectController = require("./controllers/project");
app.use("/devops", ProjectController);

const TaskController = require("./controllers/task");
app.use("/task", TaskController);

const UserController = require("./controllers/user");
app.use("/user", UserController);

app.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "user created ok" });
  } catch (err) {
    console.log("register error", err);
    res.json({ status: "user error", error: "Duplicate email" });
  }
  res.json({ status: "register ok" });
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.signed(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    return res.json({ status: "user found ok", user: true });
  } else {
    return res.json({ status: "user error", user: false });
  }
  // res.json({status: 'login ok'})
});

app.get("/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  // const decoded = jwt.verify(token, "secret123");
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({
      email: email,
    });
    return res.json({
      status: "ok",
      quote: user.quote,
    })
  } catch (err) {
    console.log("", err);
    res.json({ status: "error", err: "invalid token" });
  }
});

app.post("/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  // const decoded = jwt.verify(token, "secret123");
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await User.updateOne(
      { email: email },
      { $set: { quote: req.body.quote } }
    )
    return { status: "ok" };
  } catch (err) {
    console.log("quote error", err);
    res.json({ status: "error", err: "invalid token" });
  }
});

//end Controllers-----------------

//Listen clause
app.listen(app.get("port"), () => {
  console.log(`Connected to Port: ${app.get("port")}`);
});
