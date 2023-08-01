#!/usr/bin/env node
const parseWaterTemp = (response) => {
    let tempResponse;
    try {
        const tempCelsius = (response.d.temp_degC).toFixed(1);
        const time = response.d.time.replace('-04:00', '-00:00').replace('-05:00', '-00:00');
        const lastReadDateTime = new Date(time);
        const tempFahrenheit = (tempCelsius * (9/5) + 32).toFixed(1);
        tempResponse = {
            tempFahrenheit,
            tempCelsius,
            lastReadDateTime
        };
    }  catch (err) {
        console.log('err:', err);
    }
    return tempResponse;
}
// the third process arg maps to the first arg passed to a node command from a shell
const rawResponse = process.argv[2];
const parsedResponseToReturn = parseWaterTemp(JSON.parse(rawResponse))

// logs the JSON which returns it to the bash script to use
console.log(JSON.stringify(parsedResponseToReturn));
