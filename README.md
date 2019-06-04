# node_js_robohoover_assigment


Have to install express, body-parser, mocha and mongoose(for mongoDB).

Ex: npm install express body-parser mocha mongoose

Mocha test framework used for writing test cases.

 
 
 # YotiRoboHooverAssignment
Introduction
You will write a service that navigates a imaginary robotic hoover (much like a Roomba) through an equally imaginary room based on:

room dimensions as X and Y coordinates, identifying the top right corner of the room rectangle. This room is divided up in a grid based on these dimensions; a room that has dimensions X: 5 and Y: 5 has 5 columns and 5 rows, so 25 possible hoover positions. The bottom left corner is the point of origin for our coordinate system, so as the room contains all coordinates its bottom left corner is defined by X: 0 and Y: 0.
locations of patches of dirt, also defined by X and Y coordinates identifying the bottom left corner of those grid positions.
an initial hoover position (X and Y coordinates like patches of dirt)
driving instructions (as cardinal directions where e.g. N and E mean "go north" and "go east" respectively)
The room will be rectangular, has no obstacles (except the room walls), no doors and all locations in the room will be clean (hoovering has no effect) except for the locations of the patches of dirt presented in the program input.

Placing roboHoover on dirt patch will removes the dirt patch so that patch clean for the remainder of the program run. The roboHoover is always on. No need for on roboHoover. 

Driving into a wall has no effect (the robot skids in place).

Goal
The goal of the service is to take the room dimensions, the locations of the dirt patches, the hoover location and the driving instructions as input and to then output the following:

The final hoover position (X, Y)
The number of patches of dirt the robot cleaned up
The service must persist every input and output to a database.

Input
Program input will be received in a json payload with the format described here.

Example:

{

  "roomSize" : [5, 5],
  
  "coords" : [1, 2],
  
  "patches" : [
  
    [1, 0],
    [2, 2],
    [2, 3]
    
  ],
  
  "instructions" : "NNESEESWNWW"
}

Output:

Service output should be returned as a json payload.

Example (matching the input above):

{

  "coords" : [1, 3],
  
  "patches" : 1
  
}

Here coords are the final position of the hoover and patches is the number of cleaned patches.


