const fs = require("fs");
const os = require("os");


function setEnvValue(key, value) {

    // read file from hdd & split if from a linebreak to a array
    const ENV_VARS = fs.readFileSync("./.env", "utf8").split(os.EOL);

    // find the env we want based on the key
    const target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
        return line.match(new RegExp(key));
    }));

    // replace the key/value with the new value
    ENV_VARS.splice(target, 1, `${key}=${value}`);

    // write everything back to the file system
    fs.writeFileSync("./.env", ENV_VARS.join(os.EOL));

}

function getKey(){
    //get the key from the text contents in the file key.txt
    const key = fs.readFileSync("./0_key.txt", "utf8");
    return key
}


setEnvValue("GRAPH_API_KEY", getKey());