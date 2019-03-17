const optsPOST = {
  schema: {
    body: {
      type: 'null',
    },
    response: {
      200: {
        type: 'object',
        properties: {
          user: { type: 'string' },
          logeado: { type: 'boolean' },
        }
      }
    }
  }
}

fastify.post('/isLogged', optsPOST, async function (req, reply) {
  console.log(req.session.get('user'));
  if (req.session.get('user')) {
    const db = this.mongo.db;
    const query = await db.collection('activeSessions').find({ip:req.ip}).next().catch(err => console.error(err));
    if (query && query._id === req.session.get('user')) {
      return { user: query._id, logeado: true };
    } else {
      req.session.delete();
    }
  }
  return { user:'', logeado: false };
})