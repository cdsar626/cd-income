const optsPOST = {
  schema: {
    body: {
      type: 'object',
      properties: {
        dias: { type: 'integer'},
      },
      required: ['dias'],
    },
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            '_id': { type: 'string' },
            user: { type: 'string' },
            countryCode: { type: 'string' },
            monthlyIngress: { type: 'integer', minimum: 0 },
            food1: { type: 'integer', minimum: 0 },
            food4: { type: 'integer', minimum: 0 },
            bus: { type: 'integer', minimum: 0 },
            subway: { type: 'integer', minimum: 0 },
            light: { type: 'integer', minimum: 0 },
            water: { type: 'integer', minimum: 0 },
            gas: { type: 'integer', minimum: 0 },
            internet: { type: 'integer', minimum: 0 },
            tlf: { type: 'integer', minimum: 0 },
            gasoil: { type: 'integer', minimum: 0 },
            IVA: { type: 'integer', minimum: 0 },
            room: { type: 'integer', minimum: 0 },
            roomMin: { type: 'integer', minimum: 0 },
            roomMax: { type: 'integer', minimum: 0 },
            date: { type: 'string', format: 'date-time' },
          }
        }
      }
    }
  }
}

fastify.post('/paises', optsPOST, async function (req, reply) {
  const { dias } = req.body;
  const collection = dias ? dias == 999 ? 'alltime' : dias < 10 ? `data0${dias}` : `data${dias}` : 'submits';
  console.log((new Date()).toLocaleString() + ' -> ' + req.ip + ' : Cargando Tablas ' + collection);
  let answer = [];
  const db = this.mongo.db;
  const data = await db.collection(collection).find();
  await data.forEach((row) => {
    answer.unshift(row);
  })
  return answer;
})