const models = require ('../models');


const Events = models.Events

const createEvent = async(req,res) =>{
  const data = req.body;
  try{
    await Events.create(
      data
    );
    res.status(201);
    res.json({
      'message': 'Create Successful'
    });

  }catch(err){
    console.log(err)
  }
}

const updateEvent = async(req,res) =>{
  const data = req.body;
  const userId = req.params.id;

  try{
    await Events.update(data, { where: {id : userId}})
    console.log()
    res.status(201);
    res.json({
      'message': 'Update Successful'
    });

  }catch(err){
    console.log(err)
  }
}

const getSpecificEvents = async(req,res) =>{
  const userId = req.params.id;
  try{
    const data = await Events.findOne({ where: {id: userId}});
    
    res.json(data || '');
  }catch(err){
    console.log(err)
  }
}


const getEvents = async(req,res) =>{
  try{
    const data = await Events.findAll();
    res.json(data);
  }catch(err){
    console.log(err)
  }
}

const deleteEvent = async(req,res) =>{
  const userId = req.params.id;
  try{
    Events.destroy({ where: {id: userId}})
    res.status(201);
    res.json({
      'message': 'Delete Successful'
    });

  }catch(err){
    console.log(err)
  }
}



module.exports = {
  createEvent, getEvents,updateEvent, deleteEvent, getSpecificEvents
}