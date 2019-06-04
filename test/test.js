const express = require('express');
const bodyParser = require('body-parser');
var assert = require('assert');


var roboHooverController = require('../app/controllers/roboHoover.controllers.js');
'use strict';


describe("Array", function(){
    describe("#indexOf()",function(){
        it("should return -1",function(){
             assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

const RoboHooverInvalidPatchesRequest ={
    "roomSize" : [5, 5],
    "coords" : [1, 2],
    "patches" : [[1, -9],[2, 2],[2, 3]],
    "instructions" : "NNESEESWNWW"

}

const RoboHooverInvalidDirectionRequest ={
    "roomSize" : [5, 5],
    "coords" : [1, 2],
    "patches" : [[1, 0],[2, 2],[2, 3]],
    "instructions" : "RTERSFSA"

}


const RoboHooverInvalidRoomSizeRequest ={
    "roomSize" : [5, -5],
    "coords" : [1, 2],
    "patches" : [[1, 0],[2, 2],[2, 3]],
    "instructions" : "NNESEESWNWW"

}
/**
 * RoboHoover request details with invalid roomsize details
 */




const RoboHooverInvalidCoordsRequest ={
    "roomSize" : [5, 5],
    "coords" : [1, -2],
    "patches" : [[1, 0],[2, 2],[2, 3]],
    "instructions" : "NNESEESWNWW"

}
/**
test suit for roboHoover with invalid details
**/




describe("RoboHooverRequestValidationSuite",function(){
    /**
           test case with invalid Dirt Patches details
           **/
    describe("#roboHooverController.validateHooverRequest()",function(){
        it("should have same message:Robo Hoover request dirt patches values are not valid",function(){
            var message = roboHooverController.validateHooverRequest(RoboHooverInvalidPatchesRequest);
            assert.equal(message,"Robo Hoover request dirt patches values are not valid.[{\"roomSize\":[5,5],\"coords\":[1,2],\"patches\":[[1,-9],[2,2],[2,3]],\"instructions\":\"NNESEESWNWW\"}]");

        });
    });

    /**
    test case with invalid roomSize details
    **/

    describe("#roboHooverController.validateHooverRequest()",function(){
        it("should have same message:Robo Hoover request roomSize values are not valid",function(){
            var message = roboHooverController.validateHooverRequest(RoboHooverInvalidRoomSizeRequest);
            console.log(message);
            assert.equal(message,"Robo Hoover request roomSize values are not valid.[{\"roomSize\":[5,-5],\"coords\":[1,2],\"patches\":[[1,0],[2,2],[2,3]],\"instructions\":\"NNESEESWNWW\"}]");

        });
    });
    /**
    test case with invalid Directions details
    **/
    describe("#roboHooverController.validateHooverRequest()",function(){
        it("should have same message:Robo Hoover request coords values are not valid",function(){
            var message = roboHooverController.validateHooverRequest(RoboHooverInvalidDirectionRequest);
            assert.equal(message,"Robo Hoover request drection instruction values are not valid.[{\"roomSize\":[5,5],\"coords\":[1,2],\"patches\":[[1,0],[2,2],[2,3]],\"instructions\":\"RTERSFSA\"}]");

        });
    });

    /**
    test case with invalid Coords details
    **/
    describe("#roboHooverController.validateHooverRequest()",function(){
        it("should have same message:Robo Hoover request coords values are not valid",function(){
            var message = roboHooverController.validateHooverRequest(RoboHooverInvalidCoordsRequest);
            assert.equal(message,"Robo Hoover request coords values are not valid.[{\"roomSize\":[5,5],\"coords\":[1,-2],\"patches\":[[1,0],[2,2],[2,3]],\"instructions\":\"NNESEESWNWW\"}]");

        });
    });

});


const roboHooverReq = {"body":{
    "roomSize" : [5, 5],
    "coords" : [1, 2],
    "patches" : [[1, 0],[2, 2],[2, 3]],
    "instructions" : "NNESEESWNWW"
}
  

}

const roboHooverResponse ={ 
    message_details: 'RoboHoover cleaned patches!!!',
    hooverPosition: [ 1, 3 ],
    dirtPartsRemovalCount: 1 ,
   
        status: 200
    
}

/**
test case to clean dirt patches



describe("CleanPatches",function(){
    describe("#roboHooverController.cleanDirtPatches()",function(){
        it("It has to clean the dirt patches and should return hooverPosition and stains count",function(){
            var roboHooverRes = roboHooverController.getRoboHooverAuditDetails(roboHooverReq.instructions.grep(''),roboHooverReq);
            assert.equal(JSON.stringify(roboHooverResponse),JSON.stringify(roboHooverRes));

        });
    });
});**/

/**
 * Asynchronous mocha test.
 
describe("ServerFileTest",function(){
    describe("server get api",function(){
        it("Should return json object with time stamp",function(){
            return roboHooverController.cleanDirtPatches(roboHooverReq)
      
            .expect(200)
            .then(res => {
                assert.ok(null != res.body)
            });
        });
    });
});*/