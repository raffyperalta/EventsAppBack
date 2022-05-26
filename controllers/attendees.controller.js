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
      'message': 'Added Successful'
    });

  }catch(err){
    console.log(err)
  }
}


module.exports = {
  addAttendee
}