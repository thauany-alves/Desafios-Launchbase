const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require("./data");

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
})

server.get("/", function (req, res) {
  const about = {
    avatar_url: "https://avatars.githubusercontent.com/u/20343587?s=460&u=97e553350f50da2ad27b305d325a20af8acb7250&v=4",
    name: "Thauany Alves",
    role: "Frontend Developer",
    description: "Programadora frontend, apaixonada por programação e focada em aprender todo dia!",
    links: [
      { name: "Github", url: "https://github.com/thauany-alves" },
      { name: "Linkedin", url: "https://www.linkedin.com/in/thauany-alves/" },
    ]
  }
  return res.render("about", { about });
});

server.get("/portfolio", function (req, res) {
  return res.render("portfolio", { items: videos });
});

server.get("/video", function (req, res) {
  const id = req.query.id;

  const video = videos.find(function (video) {
    return video.id == id
  })

  if (!video) {
    return res.send("video not found");
  }
  return res.render("video", { item: video });
})

server.listen(3000, function () {
  console.log('server is runing');
});