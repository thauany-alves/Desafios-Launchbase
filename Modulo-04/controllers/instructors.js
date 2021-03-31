const fs = require('fs');
const data = require('../data.json');
const { age,date } = require('../utils');


//index 
exports.index = function (req, res) {
  return res.render("instructors/index", {instructors: data.instructors});
}

//show
exports.show = function(req, res){
  const {id} = req.params;
  
  const foundInstructor = data.instructors
    .find(instructor => instructor.id == id);
  
  if(!foundInstructor) 
    return res.send("Instructor not found");

    const instructor = {
      ...foundInstructor,
      age: age(foundInstructor.birth),
      services: foundInstructor.services.split(','),
      created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
    } 
  

  return res.render("instructors/show", instructor);

}

//create
exports.create = function (req, res) {
  return res.render("instructors/create");
}

//post
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for(key of keys){
    if(req.body[key] == ""){
      return res.send('Please, fill all fields'); 
    }
  }

  let {avatar_url,name, birth, services,gender,} = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length + 1);
  
  
  data.instructors.push({
    id,
    name, 
    avatar_url,
    birth, 
    gender,
    services,
    created_at
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("write file err!");
    return res.redirect("/instructors");
  })
  // return res.send(req.body);
}

//update
exports.update = function (req, res){
  const {id} = req.params;
  const foundInstructor = data.instructors
    .find(instructor => instructor.id == id);
  
  if(!foundInstructor) return res.send("Instructor not found");

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth).iso,
  }
 
  return res.render("instructors/edit", instructor);
}

//put 
exports.put = function(req, res){
  const {id} = req.body;
  const foundInstructor = data.instructors
    .find(instructor => instructor.id == id);
  
  if(!foundInstructor) return res.send("Instructor not found");

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),   
  }

  const index  = data.instructors.indexOf(foundInstructor);
  data.instructors[index] = instructor;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Write error ...")

    return res.redirect(`/instructors/${id}`);
  })
}

//delete
exports.delete = function(req, res){
  
  const { id } = req.body;
  
  const filteredInstructors = data.instructors.filter(function(instructor){
    return instructor.id != id
  });

  console.log('Delete data atual: ',filteredInstructors);
  
  data.instructors = filteredInstructors;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Write file error");

    return res.redirect("/instructors");
  })

  // return res.redirect("/instructors");

}