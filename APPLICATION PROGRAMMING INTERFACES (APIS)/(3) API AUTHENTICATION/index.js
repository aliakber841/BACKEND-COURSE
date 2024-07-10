import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// TODO: Replace the values below with your own before running this file.
const yourUsername = "aliakber675";
const yourPassword = "ILOVEWEB";
const yourAPIKey = "e6b6584b-6e9e-4930-ac08-197c8110dbff";
const yourBearerToken = "f4579b9c-00f1-4e42-ae47-f39838d74175";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
