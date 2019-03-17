const bcrypt = require('bcryptjs');
const emailRegex = '^([A-Z]|[a-z]|[0-9]|(([A-Z]|[a-z]|[0-9])+(\.|_)+([A-Z]|[a-z]|[0-9]))+)+@([A-Z]|[a-z]|[0-9])+(\.([A-Z]|[a-z])+)+$';
const optsPOST = {
  schema: {
    body: {
      type: 'object',
      properties: {
        user: { type: 'string' },
        pass: { type: 'string', minLength: 8 },
        email: { type: 'string', pattern: emailRegex },
      },
    },
    response: {
      200: {
        type: 'integer', // 1: success; 2: wrong data; 3: user already; 4: email already; 
        minimum: 0,
      },
    },
  }
}

fastify.post('/register', optsPOST, async function (req, reply) {
  console.log(req.body);
  const { user, pass, email } = req.body;
  // Si los datos recibidos son validos
  if (user.length === 0 || /\s/.test(user) || !(RegExp(emailRegex).test(email)) || pass.length < 8) {
    return 2;
  } else {
    const db = this.mongo.db;
    const now = new Date();
    // Si usuario ya existe
    if (await db.collection('users').find({'_id':user}).next().catch(err => console.error(err))) {
      return 3;
      // Si el correo ya existe
    } else if (await db.collection('users').find({'email':email}).next().catch(err => console.error(err))) {
      return 4;
    } else {
      // Hasheamos la pass
      let hashedPass = await bcrypt.hash(pass,10);
      await db.collection('users').insertOne({
        _id: user,
        pass: hashedPass,
        email: email,
        inscripcion: now,
        conexiones: [{when: now, where: req.ip}],
      }).catch(err => console.error(err));
      console.log(now.toLocaleString() + ' -> ' + req.ip + ' : ' + user + ' registrado con exito');
      await db.collection('activeSessions').insertOne({
        _id: user,
        ip: req.ip,
        when: now,
      });
      req.session.set('user', user);
      return 1;
    }
  }
})