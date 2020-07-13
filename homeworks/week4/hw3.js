const request = require('request');
const process = require('process');

request(`https://restcountries.eu/rest/v2/name/${process.argv[2]}`, (
  error,
  Response,
  body,
) => {
  if (Response.statusCode >= 400) {
    console.log('找不到國家資訊');
  }
  let json;
  try {
    json = JSON.parse(body);
  } catch (err) {
    console.log(err);
  }
  for (let i = 0; i < json.length; i += 1) {
    console.log(
      `============\n國家 : ${json[i].name} \n首都 : ${json[i].capital}  \n貨幣 : ${json[i].currencies[0].code} \n國碼 : ${json[i].callingCodes}`,
    );
  }
});
