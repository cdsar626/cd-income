async function updateCountryData(country, db, collection, days) { // Actualiza el promedio de X pais en Y coleccion
  let nMonthly = 0;
  let sumMonthly = 0;
  let nFood1 = 0;
  let sumFood1 = 0;
  let nFood4 = 0;
  let sumFood4 = 0;
  let nBus = 0;
  let sumBus = 0;
  let nSubway = 0;
  let sumSubway = 0;
  let nLight = 0;
  let sumLight = 0;
  let nWater = 0;
  let sumWater = 0;
  let nGas = 0;
  let sumGas = 0;
  let nInternet = 0;
  let sumInternet = 0;
  let nTlf = 0;
  let sumTlf = 0;
  let nGasoil = 0;
  let sumGasoil = 0;
  let nIva = 0;
  let sumIva = 0;
  let nRoom = 0;
  let sumRoom = 0;
  let maxRoom = 0;
  let minRoom = Number.MAX_SAFE_INTEGER;
  let now = new Date();

  let cursor;
  if (days == 999) {
    cursor = await db.collection('submits').find({
      countryCode: country,
    });
  } else {
    cursor = await db.collection('submits').find({
      date:{
        $gt: new Date(now.setDate(now.getDate()-days)), // data de time dias atras
      },
      countryCode: country,
    });
  }

  let numberSubmits = await cursor.count();
  // Se suman todos los valores que son distintos a 0, y cuántos son estos
  let sub = await cursor.forEach((submit) => {
    if (submit.monthlyIngress != 0) {
      sumMonthly = sumMonthly + submit.monthlyIngress;
      nMonthly++;
    }
    if (submit.food1 != 0) {
      sumFood1 = sumFood1 + submit.food1;
      nFood1++;
    }
    if (submit.food4 != 0) {
      sumFood4 = sumFood4 + submit.food4;
      nFood4++;
    }
    if (submit.bus != 0) {
      sumBus = sumBus + submit.bus;
      nBus++;
    }
    if (submit.subway != 0) {
      sumSubway = sumSubway + submit.subway;
      nSubway++;
    }
    if (submit.light != 0) {
      sumLight = sumLight + submit.light;
      nLight++;
    }
    if (submit.water != 0) {
      sumWater = sumWater + submit.water;
      nWater++;
    }
    if (submit.gas != 0) {
      sumGas = sumGas + submit.gas;
      nGas++;
    }
    if (submit.internet != 0) {
      sumInternet = sumInternet + submit.internet;
      nInternet++;
    }
    if (submit.tlf != 0) {
      sumTlf = sumTlf + submit.tlf;
      nTlf++;
    }
    if (submit.gasoil != 0) {
      sumGasoil = sumGasoil + submit.gasoil;
      nGasoil++;
    }
    if (submit.IVA != 0) {
      sumIva = sumIva + submit.IVA;
      nIva++;
    }
    if (submit.roomMin != 0) {
      sumRoom = sumRoom + submit.roomMin;
      nRoom++;
      if (submit.roomMin < minRoom) minRoom = submit.roomMin;
      if (submit.roomMin > maxRoom) maxRoom = submit.roomMin;
    }
  });
  // Si los submits totales != 0
  if (numberSubmits) {
    // Se calcula el promedio de cada campo
    if (nMonthly != 0) sumMonthly = sumMonthly / nMonthly;
    if (nFood1 != 0) sumFood1 = sumFood1 / nFood1;
    if (nFood4 != 0) sumFood4 = sumFood4 / nFood4;
    if (nBus != 0) sumBus = sumBus / nBus;
    if (nSubway != 0) sumSubway = sumSubway / nSubway;
    if (nLight != 0) sumLight = sumLight / nLight;
    if (nWater != 0) sumWater = sumWater / nWater;
    if (nGas != 0) sumGas = sumGas / nGas;
    if (nInternet != 0) sumInternet = sumInternet / nInternet;
    if (nTlf != 0) sumTlf = sumTlf / nTlf;
    if (nGasoil != 0) sumGasoil = sumGasoil / nGasoil;
    if (nIva != 0) sumIva = sumIva / nIva;
    if (nRoom != 0) sumRoom = sumRoom / nRoom;

    let update = await db.collection(collection).replaceOne({_id: country},{
      _id: country,
      monthlyIngress: sumMonthly,
      food1: sumFood1,
      food4: sumFood4,
      bus: sumBus,
      subway: sumSubway,
      light: sumLight,
      water: sumWater,
      gas: sumGas,
      internet: sumInternet,
      tlf: sumTlf,
      gasoil: sumGasoil,
      IVA: sumIva,
      room: sumRoom,
      roomMin: minRoom,
      roomMax: maxRoom,
    }, { upsert: true }).catch(err => console.log(err));
  } else {
    await db.collection(collection).deleteOne({_id: country});
  }
}

async function updateAllCountries(collection, since, db) { // Actualiza todos los paises en una coleccion
  console.log((new Date()).toLocaleString() +': Actualizando lista de hace ' + since + 'dias');
  let countriesDB = await db.collection('countries').find();
  await countriesDB.forEach(async function(country){
    await updateCountryData(country._id, db, collection, since);
  });
}

module.exports = { updateCountryData, updateAllCountries }