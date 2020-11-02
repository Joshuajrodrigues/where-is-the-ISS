
let mymap = L.map('mapid').setView([0, 0], 1);
let firstTime=true
const attribution='&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a> Contributers'
const tileUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles=L.tileLayer(tileUrl,{attribution})
tiles.addTo(mymap);

const issIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});
const marker=L.marker([0, 0],{icon: issIcon}).addTo(mymap);
let api_url='https://api.wheretheiss.at/v1/satellites/25544'
async function getIss(){
    
    const response = await fetch(api_url)
    const data = await response.json()
    
    const {latitude,longitude}=data
    console.log( latitude,longitude)
    //setTimeout(function () { location.reload(true); }, 5000);
    document.getElementById('lat').innerText='Latitude:'+latitude.toFixed(2)
    document.getElementById('lon').innerText='Longitude:'+longitude.toFixed(2)
    //L.marker([latitude, longitude]).addTo(mymap)
    if(firstTime){
        mymap.setView([latitude, longitude],2)
        firstTime=false
    }
    marker.setLatLng([latitude,longitude])
 
    

}


getIss()

setInterval(getIss,1000)

