import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world-countries-capitals",
  password: "123456",
  port: 5432,
});

db.connect();

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}


app.get("/", async (req, res) => {
  const countries= await checkVisisted();
  res.render("index.ejs",{
  countries: countries,
  total:countries.length})
});



app.post("/add", async (req, res) => {
  const search = req.body["country"];
try{
  const result = await db.query(
    "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'; ",
    [search.toLowerCase()]
  );
  const data = result.rows[0];
  const countryCode = data.country_code;
  try{
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
      countryCode,
    ]);
    res.redirect("/");
  } catch(error){
const countries=await checkVisisted();
res.render("index.ejs",{
  countries: countries,
  total:countries.length,
  error:"Country has already been added, Try again later"
})
  }

} catch(error){
  const countries=await checkVisisted();
res.render("index.ejs",{
  countries: countries,
  total:countries.length,
  error:"Country name does not exist, Try again later"
})
}
  
   

   
  
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
