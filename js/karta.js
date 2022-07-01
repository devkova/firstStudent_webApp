var aKoordinateList = [];
oDbKoordinate.on('value', function (oOdgovorPosluzitelja) {
    aKoordinateList = [];
    oOdgovorPosluzitelja.forEach(function (oKoordinataSnapshot) {
        var sKoordinataKey = oKoordinataSnapshot.key;
        var oKoordinata = oKoordinataSnapshot.val();
        aKoordinateList.push({
            "id": sKoordinataKey,
            "lat": oKoordinata.lat,
            "lng": oKoordinata.lng
        });
    });
    initMap();
});

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: {
            lat: 44.7,
            lng: 16.5
        }
        /* Centar mape*/
    });
    //Pozivanje liste koordinata
    aKoordinateList.forEach(oOdgovorPosluzitelja => {
        let latitude = parseFloat(oOdgovorPosluzitelja.lat);
        let longitude = parseFloat(oOdgovorPosluzitelja.lng);
        let koord = {
            lat: latitude,
            lng: longitude
        }
        /*foreach zove taj marker koliko god puta da ima nesto u queryu, ali ce spremiti svaki od njih u mapu jer je mapa izvan foreach*/
        let marker = new google.maps.Marker({
            position: koord,
            map: map
        });
    });

}
