import axios from 'axios';

let fallbackResponse;
exports.handler = async (event, context, callback) => {
    let tempResponse;
    const temperatureApi = 'https://my.wirelesstag.net/ethLogShared.asmx/GetLatestTemperatureRawDataByUUID';
    const wirelessTagUuidInjectedFromNetlify = process.env.WIRELESS_TAG_UUID;
    const temperatureRequestBody = {
            uuid: wirelessTagUuidInjectedFromNetlify
    }
    try {
        const response = await axios.post(temperatureApi,temperatureRequestBody)
            .then(res => res.data);
        const tempCelsius = (response.d.temp_degC).toFixed(1);
        const time = response.d.time.replace('-04:00', '-00:00').replace('-05:00', '-00:00');
        const lastReadDateTime = new Date(time);
        const currentDate = new Date();
        const timeDifference = ((currentDate - lastReadDateTime) / (1000 * 60)).toFixed(0);
        const tempFahrenheit = (tempCelsius * (9/5) + 32).toFixed(1);
        const lakeLevel = await getLakeLevel()

        tempResponse = {
            tempFahrenheit,
            tempCelsius,
            timeDifference,
            lakeLevel
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
async function getLakeLevel() {
  try {
    const response = await axios.get(
      "https://api.hydro-derived.duke-energy.app/lakes/current-level",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          origin: "https://lakes.hydro-derived.duke-energy.app"
        }
      }
    );

    const lakes = response.data;

    // Find the lake with LakeId = 4
    const lake = lakes.find(l => l.LakeId === 4);

    if (!lake) {
      console.log("LakeId 4 not found");
      return;
    }

    console.log("Actual value for LakeId 4:", lake.Actual);
    return lake.Actual;

  } catch (err) {
    console.error("Error fetching lake data:", err);
  }
}
