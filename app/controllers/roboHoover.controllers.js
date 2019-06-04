const RoboHooverReq = require('../models/robohooverrequest/robohooverrequest.model.js');
const RoboHooverAudit = require('../models/robohooveraudit.model.js');




/**
 * 
 * @param {RoboHooverRequrst} req 
 * @param {RoboHooverResponse} res 
 */
exports.cleanDirtPatches = (req,res) => {
    console.log(req.body)
    message_details = null;
    hooverPosition = req.body.coords;
    roomEdges = req.body.roomSize;
   
    dirtPartsRemovalCount = 0;
   if(null != exports.validateHooverRequest(req.body)){

    return res.status(400).send({
        message: message_details
    });
   }

   var str  = req.body.instructions;
   var charIns = str.split('');
   for(var i = 0; i < charIns.length; i++){
       
        switch(charIns[i]){
            case 'N':
                moveNorth();
                break;
            case 'E':
                moveEast();
                break;
            case 'S':
                moveSouth();
                break;
            case 'W':
                moveWest();
                break;
            default:
                console.log("Given instuction for RoboHoover is invalid..."+charIns[i]);
        }
       
        if(null != hooverPosition){
            
            for(let i =0; i<RoboHooverRequest.patches.length; i++){
                  if(RoboHooverRequest.patches[i][0] == hooverPosition[0] && RoboHooverRequest.patches[i][1] == hooverPosition[1]){
                    dirtPartsRemovalCount++;
                    RoboHooverRequest.patches.splice(i,1);
                  
                }
            }
        }

   }
   const robohooveraudit = new RoboHooverAudit({
        roboHooverReq: req.body,
        roboHooverRes: {
            message_details: "RoboHoover cleaned dirt patches in its direction!!!",
            hooverPosition: hooverPosition,
            dirtPartsRemovalCount: dirtPartsRemovalCount,
            status: 200
        }
    });

    robohooveraudit.save()
        .catch(err => {
       
            message: err.message || "Some thing went wrong while creating RoboHooverAudit..."
        
        });
   
   
    return res.status(200).send({
        message_details: "RoboHoover cleaned patches!!!",
        hooverPosition: hooverPosition,
        dirtPartsRemovalCount: dirtPartsRemovalCount
   
    });
};



moveNorth = () => {
    const currentPosition = hooverPosition;
    const upperRoomEdge = roomEdges[1];
    if(currentPosition[1] < upperRoomEdge){
        hooverPosition = [currentPosition[0],currentPosition[1]+1]
    }
};

moveSouth = () => {
    const currentPosition = hooverPosition;
    const lowerRoomEdge = roomEdges[1];
    if(currentPosition[1] > 0){
        hooverPosition = [currentPosition[0],currentPosition[1]-1]
    }
};

moveEast = () => {
    const currentPosition = hooverPosition;
    const leftRoomEdge = roomEdges[0];
    if(currentPosition[0] < leftRoomEdge){
        hooverPosition = [currentPosition[0]+1,currentPosition[1]]
    }
};

moveWest = () => {
    const currentPosition = hooverPosition;
    const rightRoomEdge = roomEdges[0];
    if(currentPosition[0] > 0){
        hooverPosition = [currentPosition[0]-1,currentPosition[1]]
    }
};


exports.validateHooverRequest =  (request)=>{

    message_details = null;

    RoboHooverRequest = request;

    if(null == RoboHooverRequest.roomSize || RoboHooverRequest.roomSize.length !=2 || RoboHooverRequest.roomSize[0] < 0 || RoboHooverRequest.roomSize[1] < 0){
        message_details = "Robo Hoover request roomSize values are not valid.["+JSON.stringify(RoboHooverRequest)+"]";
    }

    else if(null == RoboHooverRequest.coords || RoboHooverRequest.coords.length !=2 || RoboHooverRequest.coords[0] < 0 
        || RoboHooverRequest.coords[1] < 0 || RoboHooverRequest.coords[0] > RoboHooverRequest.roomSize[0] 
        || RoboHooverRequest.coords[1] > RoboHooverRequest.roomSize[1] ){
        message_details = "Robo Hoover request coords values are not valid.["+JSON.stringify(RoboHooverRequest)+"]";
    }
    else if(null == message_details){
        for(var i = 0; i<RoboHooverRequest.patches.length; i++){
            if(null == RoboHooverRequest.patches[i] || RoboHooverRequest.patches[i].length !=2 
                || RoboHooverRequest.patches[i][0] < 0 
                || RoboHooverRequest.patches[i][1] < 0 || RoboHooverRequest.patches[i][0] > RoboHooverRequest.roomSize[0] 
                || RoboHooverRequest.patches[i][1] > RoboHooverRequest.roomSize[1] ){
                message_details = "Robo Hoover request dirt patches values are not valid.["+JSON.stringify(RoboHooverRequest)+"]";
            }
        }
    }
   
    if(null == message_details){
        var str  = RoboHooverRequest.instructions;
        
        var charIns = str.split('');
        for(var i =0; i<charIns.length;i++){
            if(!(charIns[i] == 'N' || charIns[i] == 'E' || charIns[i] == 'S' || charIns[i] == 'W')){
                message_details = "Robo Hoover request drection instruction values are not valid.["+JSON.stringify(RoboHooverRequest)+"]";
            }
        }
    }
    




    console.log(message_details+"=========================");

    return message_details;
};