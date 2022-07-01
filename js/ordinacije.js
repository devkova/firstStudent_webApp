var aDjelatnostiList = [];
oDbDjelatnosti.on('value', function (oOdgovorPosluzitelja) {
    aDjelatnostiList = [];
    oOdgovorPosluzitelja.forEach(function (oDjelatnostSnapshot) {
        var sDjelatnostKey = oDjelatnostSnapshot.key;
        var oDjelatnost = oDjelatnostSnapshot.val();
        aDjelatnostiList.push({
            "id": sDjelatnostKey,
            "naziv": oDjelatnost.naziv
        });
    });
});

var aGradoviList = [];
oDbGradovi.on('value', function (oOdgovorPosluzitelja) {
    aGradoviList = [];
    oOdgovorPosluzitelja.forEach(function (oGradSnapshot) {
        var sGradKey = oGradSnapshot.key;
        var oGrad = oGradSnapshot.val();
        aGradoviList.push({
            "id": sGradKey,
            "naziv": oGrad.naziv
        });
    });
});

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
});

var aOrdinacijeList = [];
oDbOrdinacije.on('value', function (oOdgovorPosluzitelja) {
    aOrdinacijeList = [];
    oOdgovorPosluzitelja.forEach(function (oOrdinacijaSnapshot) {
        var sOrdinacijaKey = oOrdinacijaSnapshot.key;
        var oOrdinacija = oOrdinacijaSnapshot.val();
        aOrdinacijeList.push({
            "id": sOrdinacijaKey,
            "naziv": oOrdinacija.naziv,
            "opis": oOrdinacija.opis,
            "koordinata_id": oOrdinacija.koordinata_id,
            "adresa": oOrdinacija.adresa,
            "postanski_broj_id": oOrdinacija.postanski_broj_id,
            "grad_id": oOrdinacija.grad_id,
            "telefon": oOrdinacija.telefon,
            "mobitel": oOrdinacija.mobitel,
            "email": oOrdinacija.email,
            "djelatnost_id": oOrdinacija.djelatnost_id
        });
    });
});

var aPostanski_brojeviList = [];
oDbPostanski_brojevi.on('value', function (oOdgovorPosluzitelja) {
    aPostanski_brojeviList = [];
    oOdgovorPosluzitelja.forEach(function (oPostanski_brojSnapshot) {
        var sPostanski_brojKey = oPostanski_brojSnapshot.key;
        var oPostanski_broj = oPostanski_brojSnapshot.val();
        aPostanski_brojeviList.push({
            "id": sPostanski_brojKey,
            "broj": oPostanski_broj.broj
        });
    });
});

var aRadna_mjestaList = [];
oDbRadna_mjesta.on('value', function (oOdgovorPosluzitelja) {
    aRadna_mjestaList = [];
    oOdgovorPosluzitelja.forEach(function (oRadno_mjestoSnapshot) {
        var sRadno_mjestoKey = oRadno_mjestoSnapshot.key;
        var oRadno_mjesto = oRadno_mjestoSnapshot.val();
        aRadna_mjestaList.push({
            "id": sRadno_mjestoKey,
            "naziv": oRadno_mjesto.naziv
        });
    });
});

var aZaposleniciList = [];
oDbZaposlenici.on('value', function (oOdgovorPosluzitelja) {
    aZaposleniciList = [];
    oOdgovorPosluzitelja.forEach(function (oZaposlenikSnapshot) {
        var sZaposlenikKey = oZaposlenikSnapshot.key;
        var oZaposlenik = oZaposlenikSnapshot.val();
        aZaposleniciList.push({
            "id": sZaposlenikKey,
            "djelatnost_id": oZaposlenik.djelatnost_id,
            "ime": oZaposlenik.ime,
            "ordinacija_id": oZaposlenik.ordinacija_id,
            "prezime": oZaposlenik.prezime,
            "radno_mjesto_id": oZaposlenik.radno_mjesto_id
        });
    });
    //Funkcije 
    PopuniTablicuOrdinacije();
});

function PopuniTablicuOrdinacije() {
    var oTablicaOrdinacije = $('#TablicaOrdinacije tbody');
    oTablicaOrdinacije.empty();
    for (var a = 0; a < aOrdinacijeList.length; a++) {
        for (var b = 0; b < aGradoviList.length; b++) {
            for (var c = 0; c < aPostanski_brojeviList.length; c++) {
                for (var d = 0; d < aDjelatnostiList.length; d++) {
                    for (var z = 0; z < aKoordinateList.length; z++) {
                        if (aOrdinacijeList[a].grad_id == aGradoviList[b].id) {
                            if (aOrdinacijeList[a].postanski_broj_id == aPostanski_brojeviList[c].id) {
                                if (aOrdinacijeList[a].koordinata_id == aKoordinateList[z].id) {
                                    if (aOrdinacijeList[a].djelatnost_id == aDjelatnostiList[d].id) {
                                        oTablicaOrdinacije.append('<tr><td>' + (a + 1) + '.</td><td>' + aOrdinacijeList[a].naziv + '</td><td>' + aOrdinacijeList[a].opis + '</td><td>' + aKoordinateList[z].lat + '</td><td>' + aKoordinateList[z].lng + '</td><td>' + aOrdinacijeList[a].adresa + '</td><td>' + aPostanski_brojeviList[c].broj + '</td><td>' + aGradoviList[b].naziv + '</td><td>' + aOrdinacijeList[a].telefon + '</td><td>' + aOrdinacijeList[a].mobitel + '</td><td>' + aOrdinacijeList[a].email + '</td><td>' + aDjelatnostiList[d].naziv + '</td><td>' + '<button onclick="ObrisiOrdinaciju(' + "'" + aOrdinacijeList[a].id + "'" + ')" type="button" id="delete" class="btn btn-danger" ><span class="glyphicon glyphicon-trash"></span></button></td><td><button data-toggle="modal"data-target="#Uredi-Ordinaciju" onclick="UrediOrdinacijuForma(' + "'" + aOrdinacijeList[a].id + "'" + ')" id="edit" class="btn btn-info" ><span  class="glyphicon glyphicon-edit"></span></button></td</tr>');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function DodajOrdinaciju() {
    var sOrdinacijaNaziv = $('#inptNaziv').val();
    var sOrdinacijaOpis = $('#inptOpis').val();
    var sOrdinacijaLatitude = $('#inptLatitude').val();
    var sOrdinacijaLongitude = $('#inptLongitude').val();
    var sOrdinacijaAdresa = $('#inptAdresa').val();
    var sOrdinacijaPostanski_broj = $('#inptPostanski_broj').val();
    var sOrdinacijaGrad = $('#inptGrad').val();
    var sOrdinacijaTelefon = $('#inptTelefon').val();
    var sOrdinacijaMobitel = $('#inptMobitel').val();
    var sOrdinacijaEmail = $('#inptEmail').val();
    var sOrdinacijaDjelatnost = $('#inptDjelatnost').val();

    var postoji = false;
    for (var i = 0; i < aOrdinacijeList.length; i++) {
        if (aOrdinacijeList[i].naziv == sOrdinacijaNaziv) {
            alert('Naziv ordinacije već postoji!');
            postoji = true;
        }

        if (aOrdinacijeList[i].adresa == sOrdinacijaAdresa) {
            alert('Adresa ordinacije već postoji!');
            postoji = true;
        }

        if (aOrdinacijeList[i].telefon == sOrdinacijaTelefon) {
            alert('Broj telefona već postoji!');
            postoji = true;
        }

        if (aOrdinacijeList[i].mobitel == sOrdinacijaMobitel) {
            alert('Broj mobitela već postoji');
            postoji = true;
        }

        if (aOrdinacijeList[i].email == sOrdinacijaEmail) {
            alert('Email već postoji!');
            postoji = true;
        }
    }

    if (sOrdinacijaNaziv == "") {
        alert('Molim popunite polje "naziv"');
        postoji = true;
    }

    if (sOrdinacijaOpis == "") {
        alert('Molim popunite polje "opis"');
        postoji = true;
    }

    if (sOrdinacijaLatitude == "") {
        alert('Molim popunite polje "latitude"');
        postoji = true;
    }

    if (sOrdinacijaLatitude.length < 4) {
        alert('Najmanji unos 4 znamenki u polju "latitude"');
        postoji = true;
    }

    if (sOrdinacijaLongitude == "") {
        alert('Molim popunite polje "longitude"');
        postoji = true;
    }

    if (sOrdinacijaLongitude.length < 4) {
        alert('Najmanji unos 4 znamenki u polju "longitude"');
        postoji = true;
    }

    if (sOrdinacijaAdresa == "") {
        alert('Molim popunite polje "adresa"');
        postoji = true;
    }

    if (sOrdinacijaPostanski_broj == "") {
        alert('Molim popunite polje "poštanski broj"');
        postoji = true;
    }
    if (sOrdinacijaPostanski_broj.length < 5) {
        alert('Najmanji unos 5 brojeva u polju "poštanski broj"');
        postoji = true;
    }

    if (sOrdinacijaGrad == "") {
        alert('Molim popunite polje "grad"');
        postoji = true;
    }

    if (sOrdinacijaTelefon == "") {
        alert('Molim popunite polje "telefon"');
        postoji = true;
    }

    if (sOrdinacijaTelefon.length < 9) {
        alert('Najmanji unos 9 brojeva u polju "telefon"');
        postoji = true;
    }

    if (sOrdinacijaMobitel == "") {
        alert('Molim popunite polje mobitel');
        postoji = true;
    }

    if (sOrdinacijaMobitel.length < 9) {
        alert('Najmanji unos 9 brojeva u polju "mobitel"');
        postoji = true;
    }

    if (sOrdinacijaEmail == "") {
        alert('Molim popunite polje "email"');
        postoji = true;
    }

    if (sOrdinacijaDjelatnost == "") {
        alert('Molim popunite polje "djelatnost"');
        postoji = true;
    }

    if (postoji == false) {
        var sKey = firebase.database().ref().child('Ordinacija').push().key;
        var PostanskiBrojId = "";
        for (var i = 0; i < aPostanski_brojeviList.length; i++) {
            if (aPostanski_brojeviList[i].broj == sOrdinacijaPostanski_broj) { //provjerava jel vec postoji isti postanski broj u bazi
                PostanskiBrojId = aPostanski_brojeviList[i].id                 //ako postoji onda povlaci taj id koji je u bazi
            }
        }
        if (PostanskiBrojId == "") { //ako su postanski brojevi prazni, onda se taj postanski broj dodaje pod nekim id u bazi
            var oPostanski = {
                broj: sOrdinacijaPostanski_broj
            }
            var sKey2 = firebase.database().ref().child('postanski_broj').push().key;
            var oZapis = {};
            oZapis[sKey2] = oPostanski;
            oDbPostanski_brojevi.update(oZapis);
            PostanskiBrojId = sKey2;

        }
        var GradId = "";
        for (var i = 0; i < aGradoviList.length; i++) {
            if (aGradoviList[i].naziv == sOrdinacijaGrad) {
                GradId = aGradoviList[i].id
            }
        }
        if (GradId == "") {
            var oGrad = {
                naziv: sOrdinacijaGrad
            }
            var sKey3 = firebase.database().ref().child('grad').push().key;
            var oZapis = {};
            oZapis[sKey3] = oGrad;
            oDbGradovi.update(oZapis);
            GradId = sKey3;
        }

        var KoordinataId = "";
        for (var z = 0; z < aKoordinateList.length; z++) {
            if (aKoordinateList[z].lat == sOrdinacijaLatitude && aKoordinateList[z].lng == sOrdinacijaLongitude) {
                KoordinataId = aKoordinateList[z].id
            }
        }
        if (KoordinataId == "") {
            var oKoordinata = {
                lat: sOrdinacijaLatitude,
                lng: sOrdinacijaLongitude
            }
            var sKey5 = firebase.database().ref().child('koordinata').push().key;
            var oZapis = {};
            oZapis[sKey5] = oKoordinata;
            oDbKoordinate.update(oZapis);
            KoordinataId = sKey5;
        }

        var DjelatnostId;
        for (var i = 0; i < aDjelatnostiList.length; i++) {
            if (sOrdinacijaDjelatnost == aDjelatnostiList[i].naziv) { DjelatnostId = aDjelatnostiList[i].id }
        }
        var oOrdinacija = {
            naziv: sOrdinacijaNaziv,
            opis: sOrdinacijaOpis,
            koordinata_id: KoordinataId,
            adresa: sOrdinacijaAdresa,
            postanski_broj_id: PostanskiBrojId,
            grad_id: GradId,
            telefon: sOrdinacijaTelefon,
            mobitel: sOrdinacijaMobitel,
            email: sOrdinacijaEmail,
            djelatnost_id: DjelatnostId
        }
        var oZapis = {};
        oZapis[sKey] = oOrdinacija;
        oDbOrdinacije.update(oZapis);
        location.reload();
    }
}

function ObrisiOrdinaciju(id) {
    var a = confirm('Jeste li ste sigurni da želite obrisati ordinaciju?');
    if (a == true) {
        var IdKoordinate;
        for (var i = 0; i < aOrdinacijeList.length; i++) {
            if (aOrdinacijeList[i].id == id) { // ako je id ordinacije jednak id odabrane ordinacije 
                IdKoordinate = aOrdinacijeList[i].koordinata_id //spremaju se id koordinata u var IdKoordinate
            }
        }
        oDbKoordinate.child(IdKoordinate).remove();
        oDbOrdinacije.child(id).remove();
        location.reload();
    }
}

function UrediOrdinacijuForma(id) { //funkcija popunjava formu sa podacima ordinacije
    console.log(aKoordinateList)
    for (var i = 0; i < aOrdinacijeList.length; i++) {
        if (aOrdinacijeList[i].id == id) {
            $("#inptNoviNaziv").val(aOrdinacijeList[i].naziv);
            $("#inptNoviOpis").val(aOrdinacijeList[i].opis);
            $("#inptNovaAdresa").val(aOrdinacijeList[i].adresa);
            for (var z = 0; z < aKoordinateList.length; z++) {
                if (aOrdinacijeList[i].koordinata_id == aKoordinateList[z].id) {
                    $("#inptNovaLatituda").val(aKoordinateList[z].lat);
                    $("#inptNovaLongituda").val(aKoordinateList[z].lng);
                }
            }

            for (var a = 0; a < aPostanski_brojeviList.length; a++) {
                if (aOrdinacijeList[i].postanski_broj_id == aPostanski_brojeviList[a].id) {
                    $("#inptNoviPostanski").val(aPostanski_brojeviList[a].broj);
                }
            }
            for (var b = 0; b < aGradoviList.length; b++) {
                if (aOrdinacijeList[i].grad_id == aGradoviList[b].id) {
                    $("#inptNoviGrad").val(aGradoviList[b].naziv);
                }
            }
            $("#inptNoviTelefon").val(aOrdinacijeList[i].telefon);
            $("#inptNoviMobitel").val(aOrdinacijeList[i].mobitel);
            $("#inptNoviEmail").val(aOrdinacijeList[i].email);
            for (var c = 0; c < aDjelatnostiList.length; c++) {
                if (aOrdinacijeList[i].djelatnost_id == aDjelatnostiList[c].id) {
                    $("#inptNovaDjelatnost").val(aDjelatnostiList[c].naziv);
                }
            }

        }
    }
    $("#uredi-ordinaciju-forma").empty();
    $("#uredi-ordinaciju-forma").append('<button onclick="UrediOrdinaciju(' + "'" + id + "'" + ')" type="button" class="btn btn-success">Promjeni</button><button type="button" data-dismiss="modal" class="btn btn-danger">Odustani</button>')
}
function UrediOrdinaciju(id) {
    var prazno = false;
    var NoviNaziv = $("#inptNoviNaziv").val()
    var NoviOpis = $("#inptNoviOpis").val()
    var NovaAdresa = $("#inptNovaAdresa").val()
    var NovaLatituda = $("#inptNovaLatituda").val()
    var NovaLongituda = $("#inptNovaLongituda").val()
    var NoviPostanski = $("#inptNoviPostanski").val()
    var NoviGrad = $("#inptNoviGrad").val()
    var NoviTelefon = $("#inptNoviTelefon").val()
    var NoviMobitel = $("#inptNoviMobitel").val()
    var NoviEmail = $("#inptNoviEmail").val()
    var NovaDjelatnost = $("#inptNovaDjelatnost").val()

    if (NoviNaziv == "") {
        alert('Molim popunite polje "naziv"');
        prazno = true;
    }
    if (NoviOpis == "") {
        alert('Molim popunite polje "opis"');
        prazno = true;
    }
    if (NovaAdresa == "") {
        alert('Molim popunite polje "adresa"');
        prazno = true;
    }
    if (NovaLatituda == "") {
        alert('Molim popunite polje "latitude"');
        prazno = true;
    }
    if (NovaLatituda.length < 4) {
        alert('Najmanji unos 4 znamenki u polju latituda');
        prazno = true;
    }
    if (NovaLongituda == "") {
        alert('Molim popunite polje "longitude"');
        prazno = true;
    }
    if (NovaLongituda.length < 4) {
        alert('Najmanji unos 4 znamenki u polju longituda!');
        prazno = true;
    }
    if (NoviPostanski == "") {
        alert('Molim popunite polje "poštanski broj"');
        prazno = true;
    }
    if (NoviPostanski.length < 5) {
        alert('Najmanji unos 5 znamenaka u polju poštanski broj!');
        prazno = true;
    }
    if (NoviGrad == "") {
        alert('Molim popunite polje "grad');
        prazno = true;
    }
    if (NoviTelefon == "") {
        alert('Molim popunite polje "telefon"');
        prazno = true;
    }
    if (NoviTelefon.length < 9) {
        alert('Najmanji unos 9 brojeva u polju telefon!');
        prazno = true;
    }
    if (NoviMobitel == "") {
        alert('Molim popunite polje "mobitel"');
        prazno = true;
    }
    if (NoviMobitel.length < 9) {
        alert('Najmanji unos 9 brojeva u polju mobitel!');
        prazno = true;
    }
    if (NoviEmail == "") {
        alert('Molim popunite polje "email"');
        prazno = true;
    }

    var NoviPostanskiId = "";
    for (var a = 0; a < aPostanski_brojeviList.length; a++) {
        if (aPostanski_brojeviList[a].broj == NoviPostanski) {
            NoviPostanskiId = aPostanski_brojeviList[a].id
        }
    }
    if (NoviPostanskiId == "") {
        var oPostanski = {
            broj: NoviPostanski
        }
        var sKey88 = firebase.database().ref().child('postanski_broj').push().key;
        var oZapis = {};
        oZapis[sKey88] = oPostanski;
        oDbPostanski_brojevi.update(oZapis);
        NoviPostanskiId = sKey88;
    }

    var NoviGradId = "";
    for (var i = 0; i < aGradoviList.length; i++) {
        if (aGradoviList[i].naziv == NoviGrad) {
            NoviGradId = aGradoviList[i].id
        }
    }
    if (NoviGradId == "") {
        var oGrad = {
            naziv: NoviGrad
        }
        var sKey2 = firebase.database().ref().child('grad').push().key;
        var oZapis = {};
        oZapis[sKey2] = oGrad;
        oDbGradovi.update(oZapis);
        NoviGradId = sKey2;
    }

    var DjelatnostId;
    for (var i = 0; i < aDjelatnostiList.length; i++) {
        if (NovaDjelatnost == aDjelatnostiList[i].naziv) {
            DjelatnostId = aDjelatnostiList[i].id
        }
    }

    if (prazno == false) {
        var a = confirm('Jeste li ste sigurni da želite ažurirati ordinaciju?');
        if (a == true) {
            for (var i = 0; i < aOrdinacijeList.length; i++) {
                if (aOrdinacijeList[i].id == id) {
                    oDbKoordinate.child(aOrdinacijeList[i].koordinata_id).update({ "id": aOrdinacijeList[i].koordinata_id, "lat": NovaLatituda, "lng": NovaLongituda });
                    oDbOrdinacije.child(id).update({ // updatea podatke pod tim kljucem u bazi
                        "naziv": NoviNaziv,
                        "opis": NoviOpis,
                        "koordinata_id": aOrdinacijeList[i].koordinata_id,
                        "adresa": NovaAdresa,
                        "postanski_broj_id": NoviPostanskiId,
                        "grad_id": NoviGradId,
                        "telefon": NoviTelefon,
                        "mobitel": NoviMobitel,
                        "email": NoviEmail,
                        "djelatnost_id": DjelatnostId
                    });
                    location.reload();
                }
            }
        }
    }
}

