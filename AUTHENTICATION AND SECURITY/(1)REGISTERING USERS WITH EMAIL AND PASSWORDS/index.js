import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "123456",
  port: 5432,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email=req.body["username"];
  const password=req.body["password"];
  try{
    const checkresult= await db.query("Select * from users where email=$1",[email]);
    if(checkresult.rows.length>0){
      res.send("Email already exists. Try logging in.")
    } else{
      const store= await db.query(`Insert into users (email,password) values ($1,$2)`,
        [email,password]);
        console.log(store);
        res.render("secrets.ejs");
    }
  } catch(err){
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email=req.body["username"];
  const password=req.body["password"];

  try{
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if(result.rows.length>0){
      const user = result.rows[0];
      const checkpassword= user.password;

      if(password===checkpassword){
        res.render("secrets.ejs");
      } else {
        res.send("Incorrect Password");
      }
    } else{
      res.send("Email does not exists. Try registering in.");
    }
  } catch(err){
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
