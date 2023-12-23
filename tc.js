const args = process.argv.slice(2);

var rnumber = args[1];
var rcc = args[0];

async function main(cc, number) {
const requestOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept-Encoding': 'gzip',
    'User-Agent': 'Truecaller/11.75.5 (Android;12)',
    'Authorization': `Bearer a1i0j--jvJ__kFfkeKQrLH1Ls8SRufPh372hPqOzcf-q5XXGxLb4xf4-E74qon3E`
  }
};
async function fetchPhoneDetails(cc, number){
  try{
  var data = await fetch(`https://search5-noneu.truecaller.com/v2/search?q=${number}&countryCode=${cc}&type=4&placement=SEARCHRESULTS,HISTORY,DETAILS&encoding=json`, requestOptions);
return data.json();
  }catch(erro){
    console.log(erro);
    return "error";
  }
}

var rawdata = await fetchPhoneDetails(cc, number);  
  console.log(rawdata);
 var data = rawdata.data[0]; 

console.log(JSON.stringify(data))

}

main(rcc, rnumber);


  
