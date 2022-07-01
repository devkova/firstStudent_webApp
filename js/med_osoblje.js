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
    PopuniTablicuMedOsoblje();
});

function PopuniTablicuMedOsoblje() {
    var oTablicaMedOsoblja = $('#TablicaMedOsoblja tbody');
    oTablicaMedOsoblja.empty();
    for (var a = 0; a < aZaposleniciList.length; a++) {
        for (var b = 0; b < aRadna_mjestaList.length; b++) {
            for (var c = 0; c < aOrdinacijeList.length; c++) {
                for (var d = 0; d < aDjelatnostiList.length; d++) {
                    if (aZaposleniciList[a].radno_mjesto_id == aRadna_mjestaList[b].id) {
                        if (aZaposleniciList[a].ordinacija_id == aOrdinacijeList[c].id) {
                            if (aZaposleniciList[a].djelatnost_id == aDjelatnostiList[d].id) {
                                oTablicaMedOsoblja.append('<tr><td>' + (a + 1) + '.</td><td>' + aZaposleniciList[a].ime + '</td><td>' + aZaposleniciList[a].prezime + '</td><td>' + aRadna_mjestaList[b].naziv + '</td><td>' + aOrdinacijeList[c].naziv + '</td><td>' + aDjelatnostiList[d].naziv + '</td><td>' + '<button onclick="ObrisiOsoblje(' + "'" + aZaposleniciList[a].id + "'" + ')" type="button" id="delete" class="btn btn-danger" ><span class="glyphicon glyphicon-trash"></span></button></td><td><button data-toggle="modal"data-target="#Uredi-Osoblje" onclick="UrediOsobljeForma(' + "'" + aZaposleniciList[a].id + "'" + ')" id="edit" class="btn btn-info" ><span  class="glyphicon glyphicon-edit"></span></button></td</tr>');
                            }
                        }
                    }
                }
            }
        }
    }
}

function Popuni() {
    var odabOrdinaciju = document.getElementById("inptOdabOrdinaciju");
    if (odabOrdinaciju.options[0] == undefined) {// Provjerava da li ima opcija u dropdown, ako nema popunjava ga s opcijama tj oridinacijama
        for (index in aOrdinacijeList) {
            odabOrdinaciju.options[odabOrdinaciju.options.length] = new Option(aOrdinacijeList[index].naziv, index);
        }
    }
}

function DodajOsoblje() {
    var sOsobljeIme = $('#inptIme').val();
    var sOsobljePrezime = $('#inptPrezime').val();
    var sOsobljeRadnoMjesto = $('#inptRadnoMjesto').val();
    var sOsobljeOrd = $('#inptOdabOrdinaciju').val();

    var postoji = false;

    if (sOsobljeIme == "") {
        window.alert("Molim popunite polje 'ime'");
        postoji = true;
    }

    if (sOsobljePrezime == "") {
        window.alert("Molim popunite polje 'prezime'");
        postoji = true;
    }

    if (postoji == false) {
        var OrdinacijaId = aOrdinacijeList[sOsobljeOrd].id;
        var DjelatnostId = aOrdinacijeList[sOsobljeOrd].djelatnost_id;
        var RadMjId;
        for (var i = 0; i < aRadna_mjestaList.length; i++) {
            if (sOsobljeRadnoMjesto == aRadna_mjestaList[i].naziv) { RadMjId = aRadna_mjestaList[i].id }
        }

        var sKey = firebase.database().ref().child('zaposlenik').push().key;
        var oZaposlenik = {
            "ime": sOsobljeIme,
            "prezime": sOsobljePrezime,
            "ordinacija_id": OrdinacijaId,
            "djelatnost_id": DjelatnostId,
            "radno_mjesto_id": RadMjId
        }
        var oZapis = {};
        oZapis[sKey] = oZaposlenik;
        oDbZaposlenici.update(oZapis);
        location.reload();
    }
}

function ObrisiOsoblje(id) {
    var a = confirm('Jeste li ste sigurni da želite obrisati zaposlenika?');
    if (a == true) {
        oDbZaposlenici.child(id).remove();
        location.reload();
    }
}

function PrijelazPopuni() { //popunjava dropdown sa zaposlenicima i ordinacijama
    var odabZaposlenika = document.getElementById("odabZaposlenika");
    if (odabZaposlenika.options[0] == undefined) {
        for (index in aZaposleniciList) {
            odabZaposlenika.options[odabZaposlenika.options.length] = new Option(aZaposleniciList[index].ime + ' ' + aZaposleniciList[index].prezime, index);
        }
    }
    var odabOrdinaciju = document.getElementById("odabOrdinaciju");
    if (odabOrdinaciju.options[0] == undefined) {
        for (ord in aOrdinacijeList) {
            odabOrdinaciju.options[odabOrdinaciju.options.length] = new Option(aOrdinacijeList[ord].naziv, ord);
        }
    }
    var odabDjelatnost = document.getElementById("odabDjelatnost");
    if (odabDjelatnost.options[0] == undefined) {
        for (dj in aDjelatnostiList) {
            odabDjelatnost.options[odabDjelatnost.options.length] = new Option(aDjelatnostiList[dj].naziv, dj);
        }
    }
}

function PrebaciZaposlenika() {
    var postoji = false;

    var odabirOsob = document.getElementById("odabZaposlenika").value; //vraća element koji ima atribut odabZaposlenika
    var idZap = aZaposleniciList[odabirOsob].id; //u varijablu idZap smo spremili odabranog zaposlenika iz aZaposleniciList
    if (idZap == "") {
        alert('Molim odaberite zaposlenika');
        postoji = true;
    }

    var odabirOrd = document.getElementById("odabOrdinaciju").value;
    var idOrd = aOrdinacijeList[odabirOrd].id;
    if (idOrd == "") {
        alert('Molim odaberite ordinaciju');
        postoji = true;
    }

    var odabirDj = document.getElementById("odabDjelatnost").value;
    var idDj = aDjelatnostiList[odabirDj].id;
    if (idDj == "") {
        alert('Molim odaberite djelatnost');
        postoji = true;
    }
    if (aDjelatnostiList[odabirDj].id != aOrdinacijeList[odabirOrd].djelatnost_id) {
        alert('Djelatnost ordinacije i odabrana djelatnost se nepoklapaju');
        postoji = true
    }
    if (postoji == false) {
        var upozorenje = false;

        if (aZaposleniciList[odabirOsob].radno_mjesto_id == 1) {//ako je odabrani zaposlenik jednak 1 (med tehnicar)
            for (var i = 0; i < aZaposleniciList.length; i++) {
                if (idZap == aZaposleniciList[i].id) { //ako je id odabranog zaposlenika jednak id-ju iz aZaposleniciList
                    oDbZaposlenici.child(aZaposleniciList[i].id).update({ 'ordinacija_id': idOrd, "djelatnost_id": idDj }); //onda mi updateaj izbor i spremi ga takvog u bazu
                }
            }
            location.reload();
        }

        else
            if (aZaposleniciList[odabirOsob].djelatnost_id != aOrdinacijeList[odabirOrd].djelatnost_id) { //ako je od odabranog zaposlenika djelatnost različita od odabrane djelatnosti iz OrdinacijeList
                upozorenje = true
                alert('Djelatnosti ordinacija moraju biti iste');
            }

        if (upozorenje == false) {
            for (var i = 0; i < aZaposleniciList.length; i++) { //prolaz kroz ZaposleniciList
                if (idZap == aZaposleniciList[i].id) { //ako je odabrani zaposlenik jednak id-ju aZaposleniciList
                    oDbZaposlenici.child(aZaposleniciList[i].id).update({ 'ordinacija_id': idOrd });// updateaj izbor i spremi ga takvog u bazu
                }
            }
            location.reload();
        }
    }
}



function UrediOsobljeForma(id) {
    var odabOrdinaciju = document.getElementById("inptodabNovuOrdinaciju");
    if (odabOrdinaciju.options[0] == undefined) {// Provjerava da li ima opcija u dropdown, ako nema popunjava ga s opcijama tj ordinacijama
        for (index in aOrdinacijeList) {
            odabOrdinaciju.options[odabOrdinaciju.options.length] = new Option(aOrdinacijeList[index].naziv, index);
        }
    }
    for (var i = 0; i < aZaposleniciList.length; i++) {
        if (aZaposleniciList[i].id == id) {
            $("#inptNovoIme").val(aZaposleniciList[i].ime);
            $("#inptNovoPrezime").val(aZaposleniciList[i].prezime);
            for (var a = 0; a < aDjelatnostiList.length; a++) {
                if (aDjelatnostiList[a].id == aZaposleniciList[i].djelatnost_id) {

                    $("#inptodabNovuDjelatnost").val(aDjelatnostiList[a].naziv);
                }
            }
            for (var b = 0; b < aOrdinacijeList.length; b++) {
                if (aOrdinacijeList[b].id == aZaposleniciList[i].ordinacija_id) {
                    $("#inptodabNovuOrdinaciju").val(aOrdinacijeList[b].naziv);
                }
            }
            for (var c = 0; c < aRadna_mjestaList.length; c++) {
                if (aRadna_mjestaList[c].id == aZaposleniciList[i].radno_mjesto_id) {
                    $("#inptNovoRadno").val(aRadna_mjestaList[c].naziv);
                }
            }
        }
    }

    $("#uredi-osoblje-forma").empty();
    $("#uredi-osoblje-forma").append('<button onclick="UrediOsoblje(' + "'" + id + "'" + ')" type="button" class="btn btn-success">Promjeni</button><button type="button" class="btn btn-danger" data-dismiss="modal">Odustani</button>')

}

function UrediOsoblje(id) {
    var sOsobljeNovoIme = $('#inptNovoIme').val();
    var sOsobljeNovoPrezime = $('#inptNovoPrezime').val();
    var sOsobljeNovoRadnoMjesto = $('#inptNovoRadno').val();
    var sOsobljeNovaOrd = $('#inptodabNovuOrdinaciju').val();
    var sOsobljeNovaDjelatnost = $('#inptodabNovuDjelatnost').val();

    var postoji = false;

    if (sOsobljeNovoIme == "") {
        alert('Molim popunite polje "ime"');
        postoji = true;
    }

    if (sOsobljeNovoPrezime == "") {
        alert('Molim popunite polje "prezime"');
        postoji = true;
    }

    if (sOsobljeNovoRadnoMjesto == "") {
        alert('Molim popunite polje "radno mjesto"');
        postoji = true;
    }

    if (sOsobljeNovaOrd == "") {
        alert('Molim popunite polje "naziv"');
        postoji = true;
    }
    if (sOsobljeNovaDjelatnost == "") {
        alert('Molim popunite polje "djelatnost"');
        postoji = true;
    }

    if (sOsobljeNovaOrd == undefined) {
        window.alert("Molim izaberite ordinaciju!");
        postoji = true;
    }

    var OrdinacijaId = aOrdinacijeList[sOsobljeNovaOrd].id;
    var RadMjId;
    for (var i = 0; i < aRadna_mjestaList.length; i++) {
        if (sOsobljeNovoRadnoMjesto == aRadna_mjestaList[i].naziv) {
            RadMjId = aRadna_mjestaList[i].id
        }
    }

    var DjelatnostId;
    for (var a = 0; a < aDjelatnostiList.length; a++) {
        if (sOsobljeNovaDjelatnost == aDjelatnostiList[a].naziv) {
            DjelatnostId = aDjelatnostiList[a].id
        }
    }
    if (postoji == false) {
        if (DjelatnostId == aOrdinacijeList[sOsobljeNovaOrd].djelatnost_id) {
            var a = confirm('Jeste li ste sigurni da želite urediti osoblje?');
            if (a == true) {
                oDbZaposlenici.child(id).update({
                    "ime": sOsobljeNovoIme,
                    "prezime": sOsobljeNovoPrezime,
                    "ordinacija_id": OrdinacijaId,
                    "djelatnost_id": DjelatnostId,
                    "radno_mjesto_id": RadMjId
                });
                location.reload();
            }
        }
        else alert('Odabrana djelatnost i djelatnost ustanove se nepodudaraju!')
    }
}
