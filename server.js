const express = require("express");
var session = require("express-session");
const cors = require("cors");

const { SESSION_SECRET } = require("./helpers/serverConstants");

const next = require("next");
const { addNewWebsite, deleteWebsite, getWebsites } = require("./lib/server.website");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 100 * 3600000, secure: false, httpOnly: false },
    })
  );

  server.use(cors());
  server.use(express.static("public"));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.get("/api/websites", (request, response) => {
    const websites = getWebsites();
    response.json({ code: 200, data: websites });
  });

  server.post("/api/add-website", (request, response) => {
    addNewWebsite(request.body.website);
    response.json({ code: 200 });
  });

  server.post("/api/delete-website", (request, response) => {
    deleteWebsite(request.body.index);
    response.json({ code: 200 });
  });

  server.post("/api/user/token", (request, response) => {
    request.session.token = request.body.token;
    response.json({ code: 200 });
  });

  server.post("/api/auth/token", (request, response) => {
    response.json({ token: request.session.token });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
