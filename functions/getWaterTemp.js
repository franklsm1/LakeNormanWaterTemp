const fetch = require('node-fetch');

let fallbackResponse;
exports.handler = async (event, context, callback) => {
    let tempResponse;
    const temperatureApi = 'https://my.wirelesstag.net/ethLogShared.asmx/GetLatestTemperatureRawDataByUUID';
    const temperatureOptions = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            uuid: "a55e74cd-1705-4b40-84f8-7cb5e5521048"
        })
    }
    try {
        const response = await fetch(temperatureApi,temperatureOptions)
            .then(res => res.json());
        const tempCelsius = (response.d.temp_degC).toFixed(1);
        const time = response.d.time.replace('-04:00', '-00:00').replace('-05:00', '-00:00');
        const lastReadDateTime = new Date(time);
        const currentDate = new Date();
        const timeDifference = ((currentDate - lastReadDateTime) / (1000 * 60)).toFixed(0);
        const tempFahrenheit = (tempCelsius * (9/5) + 32).toFixed(1);
        tempResponse = {
            tempFahrenheit,
            tempCelsius,
            timeDifference
        };
        console.log('temp response:', tempResponse);
        fallbackResponse = tempResponse;
    }  catch (err) {
        console.log('err:', err);
        if (fallbackResponse) {
            tempResponse = fallbackResponse;
        } else {
            callback(null, { statusCode: 500 });
            return;
        }
    }
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(tempResponse),
    });
    return tempResponse;
}
