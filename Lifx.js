//allow us to use Environment variables for Docker deployment
require('dotenv').config();
const lifxSDK = require('api')('@lifx/v1#3lxxs239lhh5auae');

const setReqObj = (color, brightness, duration) => {
    //defaults the power to be on.
    let power = "on";

    //This allows the user to be able to enter one of hte environment variables as "off" and it will turn the light
    //off when ms teams status is set to that value.
    if(color === "off"){

        //set the color to any value - shouldn't pass as undefined
        color = "purple"
        power = "off"
    }

    return {
            duration: duration || process.env.COLOR_CHANGE_SPEED,
            fast: false,
            brightness: brightness || parseFloat(process.env.LIGHT_BRIGHTNESS), // This is done because the environment variable is stored as a string
            color:color,
            power:power
            }
}

//send message to LIFX light using LIFX API
const sendReq = (lightName, reqObj, key) => {

    //provide authentication from key or STATUS_LIGHT_KEY Env variable
    const lifxAPI = key || process.env.LIFX_API_KEY
    lifxSDK.auth(lifxAPI);

    lifxSDK.setState(reqObj,{selector:"label:" + lightName, accept:'text/plain'})
    .then(({ data }) => data )
    .catch(error => console.error(error));
}

module.exports = {
    
    setReqObj: setReqObj,
    sendReq: sendReq

}