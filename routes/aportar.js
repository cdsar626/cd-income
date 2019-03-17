const { updateCountryData, updateAllCountries } = require('../functions.js');
const optsPOST = {
}

fastify.post('/aportar', optsPOST, async function (req, reply) {
  if (req.session.get('user')) {
    const now = new Date();
    const { body } = req;
    console.log(body);
    const db = this.mongo.db;
    // query1 <- busca sesion activa con la ip del usuario que submitea (el usuario tiene que estar logeado)
    const query1 = await db.collection('activeSessions').findOne({ _id:body.user }).catch(err => console.error(err));
    if (query1) { // Si el usuario que intenta submitear tiene sesion activa, continua
      // query2 <- busca cuantos submits ha hecho el usuario en la semana
      const query2 = await db.collection('submits').find({
        user: body.user,
        date:{
          $gt: new Date(now.setDate(now.getDate()-7)), // data de time dias atras
        }
      }).count();
      // query3 <- busca cuantos submits ha hecho esa ip en la semana
      const query3 = await db.collection('submits').find({
        ip: req.ip,
        date:{
          $gt: new Date(now.setDate(now.getDate()-7)), // data de time dias atras
        }
      }).count();
      if (query2 >= 2) {
        return -4; // limite de submits por usuario alcanzado
      } else if(query3 >= 5) {
        return -5; // limite de submits por ip alcanzado
      } else {
        // query4 <- busca pais que coincida con la del usuario en la table "countries"
        const query4 = await db.collection('countries').findOne({_id:body.country}).catch(err => console.error(err));
        // Si no existe en la coleccion de paises y no es caso especial lo agrega 
        if (!query4 && !body.specialCase) {
          await db.collection('countries').insertOne({_id: body.country});
        }
        const whereToInsert = body.specialCase ? 'specialCase' : 'submits';
        await db.collection(whereToInsert).insertOne({
          ip: req.ip,
          user: body.user,
          date: now,
          specialCase: body.specialCase,
          countryCode: body.country,
          monthlyIngress: body.monthlyIngress,
          food1: body.food1,
          food4: body.food4,
          bus: body.bus,
          subway: body.subway,
          light: body.light,
          water: body.water,
          gas: body.gas,
          internet: body.internet,
          tlf: body.tlf,
          gasoil: body.gasoil,
          IVA: body.IVA,
          roomMin: body.roomMin,
        }).catch((err) => console.error(err));
        console.log((new Date()).toLocaleString() + ' -> ' + req.ip + ' : Submit realizado por ' + body.user)
        await updateCountryData(body.country, db, 'data07', 7);
        await updateCountryData(body.country, db, 'data30', 30);
        await updateCountryData(body.country, db, 'data365', 365);
        await updateCountryData(body.country, db, 'always', 999);
        return 15;
      }
    } else {
      req.session.delete();
      return -3;
    }
  } else {
    req.session.delete();
    return -3;
  }
})