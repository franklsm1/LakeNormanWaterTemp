import getWaterTemp from '../functions/getWaterTemp';
import * as axios from "axios";

const mockTempResponse = {
    "d": {
        "__type": "MyTagList.ethLogs+TemperatureDataPoint",
        "time": new Date().toISOString(),
        "temp_degC": 31.18472222222222,
        "cap": 118.99237060546875,
        "lux": 0,
        "battery_volts": 3.63696551322937
    }
};

jest.mock('axios', () => ({
    post: () => Promise.resolve({ data: mockTempResponse }),
}));

describe('Get Water Temp Response', () => {
    it('successfully gets temp in Celsius and Fahrenheit and time', async () => {
        const callback = jest.fn();
        const tempResponse = await getWaterTemp.handler(null, null, callback);
        console.log(tempResponse);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith( null,
            expect.objectContaining({
                statusCode: 200,
                body: JSON.stringify({
                    tempFahrenheit: '88.2',
                    tempCelsius: '31.2',
                    timeDifference: '0'
                })
            })
        );
    });
})
