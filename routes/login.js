const bcrypt = require('bcryptjs');

const optsPOST = {
  schema: {
    body: {
      type: 'object',
      properties: {
        user: { type: 'string' },
        pass: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'integer', // 5: already logged; 2: session active; 1: login success; 0: unmatch
        minimum: 0,
      },
    },
  }
}


fastify.post('/login', optsPOST, async function (req, reply) {
  if (req.session.get('user')) { // Si ya esta logeado (o eso aparenta)
    req.session.delete();
    return 5;
  } else {
    const {user, pass} = req.body;
    const db = this.mongo.db;
    const query = await db.collection('users').find({
      _id:user,
    }).next().catch(err => console.error(err)) || false;
    console.log(query);
    if (await bcrypt.compare(pass, query.pass)) { // Si credenciales concuerdan
      // Si hay una sesion activa
      if ( await db.collection('activeSessions')
      .find({_id:user}).next()
      .catch(err => console.error(err)) || await db.collection('activeSessions')
      .find({ip:req.ip}).next().catch(err => console.error(err)) ) {
        req.session.delete(); // Eliminamos la sesion
        await db.collection('activeSessions').deleteOne({_id: user});
        await db.collection('activeSessions').deleteMany({ip: req.ip});
        return 2; 
      } else {
        // Finalmente se logea
        const now = new Date();
        await db.collection('users').findOneAndUpdate({_id: user}, {
          $push: {
            conexiones: {
              $each: [
                  { when: now, where: req.ip }
                ],
              $slice: -20}
            }
        }).catch(err => console.error(err));
        await db.collection('activeSessions').insertOne({
          _id: user,
          ip: req.ip,
          when: now,
        });
        req.session.set('user', user);
        console.log(now.toLocaleString() + ' -> ' + req.ip + ' : ' + user + ' logeado');
        return 1;
      }
    } else {
      return 0;
    }
  }
  console.log(req.body);
  return 0;
})