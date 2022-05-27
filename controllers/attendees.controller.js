const models = require ('../models');

const Attendee = models.Attendee

const addAttendee = async(req,res) =>{
  const data = req.body;
  try{
    await Attendee.create(
      data
    );
    res.status(201);
    res.json({
      'statusCode' : 201,
      'message': 'Added Successful',
      'body': data
    });

  }catch(err){
    res.status(400);
    console.log(err)
  }
}


module.exports = {
  addAttendee
}