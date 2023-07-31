#!/bin/bash
echo "Getting water temperature from curl calling sensor API"

# Auto fail on error to and run the trap command to use the old HTML file
set -e
trap 'echo "Error during build, using old HTML file" && cp index_old.html index.html' ERR

# Make API call to wireless sensor API to get the current temperature
DOUBLE_QUOTE='"'
PAYLOAD="{ uuid: ${DOUBLE_QUOTE}${WIRELESS_TAG_UUID}${DOUBLE_QUOTE}}"
echo "PAYLOAD: $PAYLOAD"
RESPONSE=$(curl -k --location -s --request POST -H "Content-Type:application/json" https://my.wirelesstag.net/ethLogShared.asmx/GetLatestTemperatureRawDataByUUID --data "${PAYLOAD}")
STRING_RESPONSE=$(echo $RESPONSE | jq -r tostring)
echo "Response from wireless tag sensor: $STRING_RESPONSE"

JSON_CONFIG=$(node parseWaterTemperature.js ${STRING_RESPONSE})
echo "JSON config sent to EJS: $JSON_CONFIG"

npm install ejs
JSON_CONFIG=$JSON_CONFIG npm run ejs-build
