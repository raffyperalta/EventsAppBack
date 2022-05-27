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
      'statusCode' : 201,
      'message': 'Create Successful',
      'body': data
    });

  }catch(err){
    res.status(400);
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
      'statusCode' : 201,
      'message': 'Update Successful'
    });

  }catch(err){
    res.status(400);
    console.log(err)
  }
}

const getSpecificEvents = async(req,res) =>{
  const userId = req.params.id;
  try{
    const data = await Events.findOne({ where: {id: userId}});
    res.status(200);
    res.json(data || '');
  }catch(err){
    res.status(400);
    console.log(err)
  }
}


const getEvents = async(req,res) =>{
  try{
    const data = await Events.findAll();
    res.status(200);
    res.json(data);
  }catch(err){
    res.status(400);
    console.log(err)
  }
}

const getAttendees = async(req,res) =>{
  try{
    const eventId = req.params.id;
    const data = await models.sequelize.query(
      `SELECT users.id ,users.name, users.email FROM users 
      INNER JOIN attendees ON users.id = attendees.attendeeId
      INNER JOIN events ON attendees.eventId = events.id
      WHERE events.id = ${eventId} `
    );
    // console.log(data)
    res.status(200);
    res.json(data);
  }catch(err){
    res.status(400);
    console.log(err)
  }
}

const deleteEvent = async(req,res) =>{
  const userId = req.params.id;
  try{
    Events.destroy({ where: {id: userId}})
    res.status(200);
    res.json({
      'statusCode' : 200,
      'message': 'Delete Successful'
    });

  }catch(err){
    res.status(400);
    console.log(err)
  }
}



module.exports = {
  createEvent, getEvents,updateEvent, deleteEvent, getSpecificEvents, getAttendees
}