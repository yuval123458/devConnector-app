const express = require("express");
const connectDB = require("./config/db");
const usersRoute = require("./routes/api/users");
const authRoute = require("./routes/api/Auth");
const profileRoute = require("./routes/api/profile");
const postsRoute = require("./routes/api/posts");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res, next) => res.send("API running"));

app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/profile", profileRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
