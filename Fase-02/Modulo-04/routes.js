const express = require('express')
const routes = express.Router();
const instructors = require("./instructors");


routes.get("/", function (req, res) {
  return res.redirect("/instructors");
});

routes.get("/instructors", instructors.index );

routes.get("/instructors/create", function (req, res) {
  return res.render("instructors/create");
});

routes.post("/instructors", instructors.post);

routes.get("/instructors/:id", instructors.show);

routes.get("/instructors/:id/edit", instructors.update);

routes.put("/instructors", instructors.put);

routes.delete("/instructors", instructors.delete);

routes.get("/members", function (req, res) {
  return res.send("members");
});



routes.use(function(req, res) {
  res.status(404).render("not-found");
});

module.exports = routes
