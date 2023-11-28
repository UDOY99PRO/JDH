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
    'Authorization': `Bearer a1i0p--jQBd6NFoVp_nPucgWqH2tpi8r9YHANVNwhpml4vgW1XjAxzP5d72qK09j`
  }
};
async function fetchPhoneDetails(cc, number){
  try{
  var data = await fetch(`https://search5-noneu.truecaller.com/v2/search?q=${number}&countryCode=${cc}&type=4&placement=SEARCHRESULTS,HISTORY,DETAILS&encoding=json`, requestOptions);
return data.json();
  }catch{
    return "error";
  }
}

var rawdata = await fetchPhoneDetails("IN", "+916296557613");  
 var data = rawdata.data[0]; 

console.log(JSON.stringify(data))

}

main(rcc, rnumber);
