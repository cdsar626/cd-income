const optsPOST = {
  schema: {
    body: {
      type: 'null',
    },
    response: {
      200: {
        type: 'boolean',
      },
    },
  }
}

fastify.post('/logout', optsPOST, async function (req, reply) {
  const user = req.session.get('user');
  if (user) {
    const db = this.mongo.db;
    await db.collection('activeSessions').findOneAndDelete({user: user}).catch(err => console.error(err));
    req.session.delete();
  }
  return false;
})