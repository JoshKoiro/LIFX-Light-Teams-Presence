const http = require('https');

const getStatus = (key) => {
    return new Promise((resolve, reject) => {
        //key is an optional parameter if an environement variable is being used.
    key = key || process.env.API_KEY

    //define the request object
    const options = {
        "method": "GET",
        "hostname": "graph.microsoft.com",
        "port": null,
        "path": "/beta/me/presence",
        "headers": {
          "Content-Type": "application/json",
          "Content-Length": "0",
          //Bearer type auth token
          "Authorization": 'Bearer ' + key
        }
    }

    //MS Teams API request
    const statusReq = http.request(options, function (statusRes) {

        //data is returned as a stream, we have to parse it into a JSON response.
        const chunks = [];
        
        //push chunks to array when receiving a packet
        statusRes.on("data", function (chunk) {
          chunks.push(chunk);
        });
        
        //combine the array into a string so it can be converted into a JSON object
        statusRes.on("end", function () {
          const body = Buffer.concat(chunks);
          const results = JSON.parse(body)
    
          //parse the JSON data to get the relevent information
          //I've included more data points for future projects
          const output = {
            availability: results.availability,
            activity: results.activity,
            statusMessage: results.statusMessage,
            outOfOfficeSettings: results.outOfOfficeSettings,
            error: results.error || null
          }
    
          //error handling if the JSON cannot be parsed.
          if (output.error !== null){
            console.error(results.error)
            reject(results.error);
          } else {
            resolve(output)
          }
        
        });
      });
    
      //Error handling if the http request cannotbe fulfilled
      statusReq.on('error', (error) => {
        console.error(error);
        reject('Failed to fetch status');
      });
      
      statusReq.end();
    });
};

    

module.exports = {
    getStatus:getStatus
}