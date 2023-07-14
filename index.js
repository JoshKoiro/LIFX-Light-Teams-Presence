const express = require('express');
const app = express();
const { getStatus } = require('./msTeams.js');
const { setReqObj, sendReq } = require('./Lifx.js');

//allow us to use Environment variables from .env file or docker container
require('dotenv').config();

//setting default health status for /health endpoint
let isHealthy = true;

// health endpoint for docker container
app.get('/health',(req,res) =>{
    if(isHealthy){
        res.status(200).json({ status: 'ok'});
    } else {
        res.status(500).json({ status: 'error'});
    }
    
})

const checkStatus = () => {

    // This code provides a timestamp as a long of when the checkStatus function is run
    let timestamp = new Date()
    let formattedTimestamp = timestamp.toLocaleString("en-US", {timeZone: "America/New_York"})
    console.log("Checking Status: " + formattedTimestamp)

    //Getting the teams status
    getStatus(process.env.GRAPH_API_KEY)
        .then((data) => {

            //setting a variable to hold the color the light is to be set to for console.log
            let currentColor;
            
            //This switch procedure determines what color the light should be. 
            switch(data.availability){
                case "Available":
                    sendReq("Status Light",setReqObj(process.env.AVAILABLE_COLOR))
                    currentColor = process.env.AVAILABLE_COLOR
                break;
                case "Busy":
                    sendReq("Status Light",setReqObj(process.env.BUSY_COLOR))
                    currentColor = process.env.BUSY_COLOR
                break;
                case "DoNotDisturb":
                    sendReq("Status Light",setReqObj(process.env.DO_NOT_DISTURB_COLOR))
                    currentColor = process.env.DO_NOT_DISTURB_COLOR
                break;
                case "Away":
                    sendReq("Status Light",setReqObj(process.env.AWAY_COLOR))
                    currentColor = process.env.AWAY_COLOR
                break;
                case "BeRightBack":
                    sendReq("Status Light",setReqObj(process.env.BE_RIGHT_BACK_COLOR))
                    currentColor = process.env.BE_RIGHT_BACK_COLOR
                break;
                case "Offline":
                    sendReq("Status Light",setReqObj(process.env.OFFLINE_COLOR))
                    currentColor = process.env.OFFLINE_COLOR
                break;
                default:
                    setReqObj("Status Light","off")
            }
            console.log("Teams status is [" + data.availability + "]") 
            console.log("Light is set to [" + currentColor + "]\n")
        })
        .catch(error => {
            isHealthy = false;
            console.error('Error:', error);
            console.error("Could not connect to Teams API Endpoint. Most likey the access key is not valid...retrying")
          });

    
}

const port = 3000;
app.listen(port, () => {
    console.log(`\n🔧 application endpoints are accessable on port ${port}\n`);
    console.log(`---------------------------------------------------`)
    console.log(`🏥 /health: application HEALTHCHECK for Docker`)
    console.log(`---------------------------------------------------\n`)

    //this runs the checkStatus function as soon as the code executes so there
    //is no delay after execution
    checkStatus()

    // //main loop
    setInterval(checkStatus,
        process.env.REFRESH_RATE * 1000
    )
});