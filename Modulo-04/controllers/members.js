const fs = require('fs');
const data = require('../data.json');
const { age,date } = require('../utils');

//index 
exports.index = function (req, res){
  return res.render("members/index", {members: data.members});
}

//show
exports.show = function(req, res){
  const {id} = req.params;
  
  const foundMember = data.members
    .find(member => member.id == id);
  
  if(!foundMember) 
    return res.send("Member not found");

    const member = {
      ...foundMember,
      age: age(foundMember.birth),
      // created_at: new Intl.DateTimeFormat("pt-BR").format(foundMember.created_at),
    } 
  return res.render("members/show", member);
}

//form create 
exports.create =  function(req, res){
  return res.render("members/create");
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
  const id = Number(data.members.length + 1);
  
  
  data.members.push({
    id,
    name, 
    avatar_url,
    birth, 
    gender,
    created_at
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("write file err!");
    return res.redirect("/members");
  })
  // return res.send(req.body);
}

//update
exports.update = function (req, res){
  const {id} = req.params;
  const foundMember = data.members
    .find(member => member.id == id);
  
  if(!foundMember) return res.send("Member not found");

  const member = {
    ...foundMember,
    birth: date(foundMember.birth),
        
  }
 
  return res.render("members/edit", member);
}

//put 
exports.put = function(req, res){
  const {id} = req.body;
  const foundMember = data.members
    .find(member => member.id == id);
  
  if(!foundMember) return res.send("Member not found");

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),   
  }

  const index  = data.members.indexOf(foundMember);
  data.members[index] = member;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Write error ...")

    return res.redirect(`/members/${id}`);
  })
}

//delete
exports.delete = function(req, res){
  
  const { id } = req.body;
  
  const filteredMembers = data.members.filter(function(member){
    return member.id != id
  });

  console.log('Delete data atual: ',filteredMembers);
  
  data.members = filteredMembers;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Write file error");

    return res.redirect("/members");
  })

  // return res.redirect("/members");

}