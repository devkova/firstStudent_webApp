var aDjelatnosti = []; //globalna varijabla u kojoj se spremaju djelatnosti
oDbDjelatnosti.on('value', function (oOdgovorPosluzitelja) {
  aDjelatnosti = [];
  oOdgovorPosluzitelja.forEach(function (oDjelatnostSnapshot) {
    var sDjelatnostKey = oDjelatnostSnapshot.key;
    var oDjelatnost = oDjelatnostSnapshot.val();
    aDjelatnosti.push({
      "id": sDjelatnostKey,
      "naziv": oDjelatnost.ime
    });
  });
});

var aGradovi = [];
oDbGradovi.on('value', function (oOdgovorPosluzitelja) {
  aGradovi = [];
  oOdgovorPosluzitelja.forEach(function (oGradSnapshot) {
    var sGradKey = oGradSnapshot.key;
    var oGrad = oGradSnapshot.val();
    aGradovi.push({
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

var aOrdinacije = [];
oDbOrdinacije.on('value', function (oOdgovorPosluzitelja) {
  aOrdinacije = [];
  oOdgovorPosluzitelja.forEach(function (oOrdinacijaSnapshot) {
    var sOrdinacijaKey = oOrdinacijaSnapshot.key;
    var oOrdinacija = oOrdinacijaSnapshot.val();
    aOrdinacije.push({
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

var aPostanski_brojevi = [];
oDbPostanski_brojevi.on('value', function (oOdgovorPosluzitelja) {
  aPostanski_brojevi = [];
  oOdgovorPosluzitelja.forEach(function (oPostanski_brojSnapshot) {
    var sPostanski_brojKey = oPostanski_brojSnapshot.key;
    var oPostanski_broj = oPostanski_brojSnapshot.val();
    aPostanski_brojevi.push({
      "id": sPostanski_brojKey,
      "broj": oPostanski_broj.broj
    });
  });
});

var aRadna_mjesta = [];
oDbRadna_mjesta.on('value', function (oOdgovorPosluzitelja) {
  aRadna_mjesta = [];
  oOdgovorPosluzitelja.forEach(function (oRadno_mjestoSnapshot) {
    var sRadno_mjestoKey = oRadno_mjestoSnapshot.key;
    var oRadno_mjesto = oRadno_mjestoSnapshot.val();
    aRadna_mjesta.push({
      "id": sRadno_mjestoKey,
      "naziv": oRadno_mjesto.naziv
    });
  });
});

var aZaposlenici = [];
oDbZaposlenici.on('value', function (oOdgovorPosluzitelja) {
  aZaposlenici = [];
  oOdgovorPosluzitelja.forEach(function (oZaposlenikSnapshot) {
    var sZaposlenikKey = oZaposlenikSnapshot.key;
    var oZaposlenik = oZaposlenikSnapshot.val();
    aZaposlenici.push({
      "id": sZaposlenikKey,
      "djelatnost_id": oZaposlenik.djelatnost_id,
      "ime": oZaposlenik.ime,
      "ordinacija_id": oZaposlenik.ordinacija_id,
      "prezime": oZaposlenik.prezime,
      "radno_mjesto_id": oZaposlenik.radno_mjesto_id
    });
  });
  //Funkcije
  FilterPopuni();
  PrikazFilter();
});

function FilterPopuni() {
  var odabirGrada = document.getElementById("odabirGrada");
  odabirGrada.options[odabirGrada.options.length] = new Option('Svi gradovi', "");
  for (index in aGradoviList) {
    odabirGrada.options[odabirGrada.options.length] = new Option(aGradoviList[index].naziv, index);
  }

  var odabirDjelatnosti = document.getElementById("odabirDjelatnosti");
  odabirDjelatnosti.options[odabirDjelatnosti.options.length] = new Option('Sve djelatnosti', "");
  for (ord in aDjelatnostiList) {
    odabirDjelatnosti.options[odabirDjelatnosti.options.length] = new Option(aDjelatnostiList[ord].naziv, ord);
  }
}

function PrikazFilter() {
  var Grad = $('#odabirGrada').val();
  var Djelatnost = $('#odabirDjelatnosti').val();
  var rb = 1;
  var oTablicaOrdinacije1 = $('#TablicaOrdinacije1 tbody');
  if (Grad == "" && Djelatnost == "") {
    oTablicaOrdinacije1.empty();
    for (var a = 0; a < aOrdinacijeList.length; a++) {
      for (var b = 0; b < aGradoviList.length; b++) {
        for (var c = 0; c < aPostanski_brojeviList.length; c++) {
          for (var d = 0; d < aDjelatnostiList.length; d++) {
            for (var z = 0; z < aKoordinateList.length; z++) {
              if (aOrdinacijeList[a].grad_id == aGradoviList[b].id) {
                if (aOrdinacijeList[a].postanski_broj_id == aPostanski_brojeviList[c].id) {
                  if (aOrdinacijeList[a].djelatnost_id == aDjelatnostiList[d].id) {
                    if (aOrdinacije[a].koordinata_id == aKoordinateList[z].id) {
                      oTablicaOrdinacije1.append('<tr><td>' + rb++ + '.</td><td>' + aOrdinacijeList[a].naziv + '</td><td>' + aOrdinacijeList[a].opis + '</td><td>' + aKoordinateList[z].lat + '</td><td>' + aKoordinateList[z].lng + '</td><td>' + aOrdinacijeList[a].adresa + '</td><td>' + aPostanski_brojeviList[c].broj + '</td><td>' + aGradoviList[b].naziv + '</td><td>' + aOrdinacijeList[a].telefon + '</td><td>' + aOrdinacijeList[a].mobitel + '</td><td>' + aOrdinacijeList[a].email + '</td><td>' + aDjelatnostiList[d].naziv + '</td><td><button data-toggle="modal"data-target="#Osoblje-tablica" onclick="OsobljeOrdinacije(' + "'" + aOrdinacijeList[a].id + "'" + ')" id="edit" class="btn btn-info" ><span  class="glyphicon glyphicon-edit"></span></button></td</tr>');
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
}

function Filter() {
  var Grad = $('#odabirGrada').val();
  var Djelatnost = $('#odabirDjelatnosti').val();
  var rb = 1;
  var oTablicaOrdinacije1 = $('#TablicaOrdinacije1 tbody');
  if (Grad == "" && Djelatnost == "") {
    oTablicaOrdinacije1.empty();
    for (var a = 0; a < aOrdinacijeList.length; a++) {
      for (var b = 0; b < aGradoviList.length; b++) {
        for (var z = 0; z < aKoordinateList.length; z++) {
          for (var c = 0; c < aPostanski_brojeviList.length; c++) {
            for (var d = 0; d < aDjelatnostiList.length; d++) {
              if (aOrdinacijeList[a].grad_id == aGradoviList[b].id) {
                if (aOrdinacije[a].koordinata_id == aKoordinateList[z].id) {
                  if (aOrdinacijeList[a].postanski_broj_id == aPostanski_brojeviList[c].id) {
                    if (aOrdinacijeList[a].djelatnost_id == aDjelatnostiList[d].id) {
                      oTablicaOrdinacije1.append('<tr><td>' + rb++ + '.</td><td>' + aOrdinacijeList[a].naziv + '</td><td>' + aOrdinacijeList[a].opis + '</td><td>' + aKoordinateList[z].lat + '</td><td>' + aKoordinateList[z].lng + '</td><td>' + aOrdinacijeList[a].adresa + '</td><td>' + aPostanski_brojeviList[c].broj + '</td><td>' + aGradoviList[b].naziv + '</td><td>' + aOrdinacijeList[a].telefon + '</td><td>' + aOrdinacijeList[a].mobitel + '</td><td>' + aOrdinacijeList[a].email + '</td><td>' + aDjelatnostiList[d].naziv + '</td><td><button data-toggle="modal"data-target="#Osoblje-tablica" onclick="OsobljeOrdinacije(' + "'" + aOrdinacijeList[a].id + "'" + ')" id="edit" class="btn btn-info" ><span  class="glyphicon glyphicon-edit"></span></button></td</tr>');
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

  if (Grad != "" && Djelatnost != "") {
    oTablicaOrdinacije1.empty();
    var rb = 1;
    for (var a = 0; a < aOrdinacijeList.length; a++) {
      for (var b = 0; b < aGradoviList.length; b++) {
        for (var z = 0; z < aKoordinateList.length; z++) {
          for (var c = 0; c < aPostanski_brojeviList.length; c++) {
            for (var d = 0; d < aDjelatnostiList.length; d++) {
              if (aOrdinacijeList[a].grad_id == aGradoviList[b].id) {
                if (aOrdinacijeList[a].postanski_broj_id == aPostanski_brojeviList[c].id) {
                  if (aOrdinacijeList[a].djelatnost_id == aDjelatnostiList[d].id) {
                    if (aGradoviList[b] == aGradoviList[Grad]) {
                      if (aOrdinacije[a].koordinata_id == aKoordinateList[z].id) {
                        if (aDjelatnostiList[d] == aDjelatnostiList[Djelatnost]) {
                          oTablicaOrdinacije1.append('<tr><td>' + rb++ + '.</td><td>' + aOrdinacijeList[a].naziv + '</td><td>' + aOrdinacijeList[a].opis + '</td><td>' + aKoordinateList[z].lat + '</td><td>' + aKoordinateList[z].lng + '</td><td>' + aOrdinacijeList[a].adresa + '</td><td>' + aPostanski_brojeviList[c].broj + '</td><td>' + aGradoviList[b].naziv + '</td><td>' + aOrdinacijeList[a].telefon + '</td><td>' + aOrdinacijeList[a].mobitel + '</td><td>' + aOrdinacijeList[a].email + '</td><td>' + aDjelatnostiList[d].naziv + '</td><td><button data-toggle="modal"data-target="#Osoblje-tablica" onclick="OsobljeOrdinacije(' + "'" + aOrdinacijeList[a].id + "'" + ')" id="edit" class="btn btn-info" ><span  class="glyphicon glyphicon-edit"></span></button></td</tr>');
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
    }
  }

  if (Grad != "" && Djelatnost == "") {
    oTablicaOrdinacije1.empty();
    var rb = 1;
    for (var a = 0; a < aOrdinacijeList.length; a++) {
      for (var b = 0; b < aGradoviList.length; b++) {
        for (var c = 0; c < aPostanski_brojeviList.length; c++) {
          for (var z = 0; z < aKoordinateList.length; z++) {
            for (var d = 0; d < aDjelatnostiList.length; d++) {
              if (aOrdinacijeList[a].grad_id == aGradoviList[b].id) {
                if (aOrdinacijeList[a].postanski_broj_id == aPostanski_brojeviList[c].id) {
                  if (aOrdinacijeList[a].djelatnost_id == aDjelatnostiList[d].id) {
                    if (aOrdinacije[a].koordinata_id == aKoordinateList[z].id) {
                      if (aGradoviList[b] == aGradoviList[Grad]) {
                        oTablicaOrdinacije1.append('<tr><td>' + rb++ + '.</td><td>' + aOrdinacijeList[a].naziv + '</td><td>' + aOrdinacijeList[a].opis + '</td><td>' + aKoordinateList[z].lat + '</td><td>' + aKoordinateList[z].lng + '</td><td>' + aOrdinacijeList[a].adresa + '</td><td>' + aPostanski_brojeviList[c].broj + '</td><td>' + aGradoviList[b].naziv + '</td><td>' + aOrdinacijeList[a].telefon + '</td><td>' + aOrdinacijeList[a].mobitel + '</td><td>' + aOrdinacijeList[a].email + '</td><td>' + aDjelatnostiList[d].naziv + '</td><td><button data-toggle="modal"data-target="#Osoblje-tablica" onclick="OsobljeOrdinacije(' + "'" + aOrdinacijeList[a].id + "'" + ')" id="edit" class="btn btn-info" ><span  class="glyphicon glyphicon-edit"></span></button></td</tr>');
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
  }

  if (Grad == "" && Djelatnost != "") {
    oTablicaOrdinacije1.empty();
    var rb = 1;
    for (var a = 0; a < aOrdinacijeList.length; a++) {
      for (var b = 0; b < aGradoviList.length; b++) {
        for (var c = 0; c < aPostanski_brojeviList.length; c++) {
          for (var z = 0; z < aKoordinateList.length; z++) {
            for (var d = 0; d < aDjelatnostiList.length; d++) {
              if (aOrdinacijeList[a].grad_id == aGradoviList[b].id) {
                if (aOrdinacijeList[a].postanski_broj_id == aPostanski_brojeviList[c].id) {
                  if (aOrdinacije[a].koordinata_id == aKoordinateList[z].id) {
                    if (aOrdinacijeList[a].djelatnost_id == aDjelatnostiList[d].id) {
                      if (aDjelatnostiList[d] == aDjelatnostiList[Djelatnost]) {
                        oTablicaOrdinacije1.append('<tr><td>' + rb++ + '.</td><td>' + aOrdinacijeList[a].naziv + '</td><td>' + aOrdinacijeList[a].opis + '</td><td>' + aKoordinateList[z].lat + '</td><td>' + aKoordinateList[z].lng + '</td><td>' + aOrdinacijeList[a].adresa + '</td><td>' + aPostanski_brojeviList[c].broj + '</td><td>' + aGradoviList[b].naziv + '</td><td>' + aOrdinacijeList[a].telefon + '</td><td>' + aOrdinacijeList[a].mobitel + '</td><td>' + aOrdinacijeList[a].email + '</td><td>' + aDjelatnostiList[d].naziv + '</td><td><button data-toggle="modal"data-target="#Osoblje-tablica" onclick="OsobljeOrdinacije(' + "'" + aOrdinacijeList[a].id + "'" + ')" id="edit" class="btn btn-info" ><span  class="glyphicon glyphicon-edit"></span></button></td</tr>');
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
  }
}

function OsobljeOrdinacije(id) { //povlaci id ordinacije koje se odabere za prikaz osoblja
  var oTablicaOsoblje = $('#TablicaOsoblja tbody');
  oTablicaOsoblje.empty();
  for (var i = 0; i < aZaposleniciList.length; i++) {
    for (var a = 0; a < aRadna_mjestaList.length; a++)
      if (aZaposleniciList[i].ordinacija_id == id) {
        if (aZaposleniciList[i].radno_mjesto_id == aRadna_mjestaList[a].id) {
          oTablicaOsoblje.append('<tr><td>' + aZaposleniciList[i].ime + '</td><td>' + aZaposleniciList[i].prezime + '</td><td>' + aRadna_mjestaList[a].naziv + '</td></tr>');
        }
      }
  }
}
