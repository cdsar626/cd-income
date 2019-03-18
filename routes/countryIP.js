const axios = require('axios');
const key = process.env.ipStackKey;
const optsPOST = {
  schema: {
    body: {
      type: 'null',
    },
    response: {
      200: {
        type: 'string',
        maxLength: 3,
      },
    },
  }
}


fastify.post('/countryIP', optsPOST, async (req, reply) => {
  if (req.session.get('user')) {
    console.log(key);
    let res = await axios.get(`http://api.ipstack.com/${req.ip}?access_key=${key}&fields=country_code`)
    .catch((err) => console.error(err));
    console.log(req.ip, res.data);
    return res.data.country_code || '';
  } else {
    return '';
  }
})