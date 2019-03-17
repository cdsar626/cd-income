<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>pais</th>
          <th>user</th>
          <th>ip</th>
          <th>ingreso</th>
          <th>food1</th>
          <th>food4</th>
          <th>Hab. prom.</th>
          <th>Bus</th>
          <th>Metro</th>
          <th>Luz</th>
          <th>Agua</th>
          <th>Gas</th>
          <th>Internet</th>
          <th>Telefono</th>
          <th>Gasolina</th>
          <th>IVA</th>
          </tr>
      </thead>
      <tbody>
        <tr v-for="pais in data" :key="pais.date">
          <td>
            {{pais.date}}
          </td>
          <td :title="c.getName(pais.countryCode)">
            {{c.getName(pais.countryCode)}}
          </td>
          <td>
            {{pais.user}}
          </td>
          <td>
            <a :href="`http://ip-api.com/json/${pais.ip}`" target="blank">{{pais.ip}}</a>
          </td>
          <td>
            {{Number((pais.monthlyIngress).toFixed(2)).toLocaleString()}}
          </td>
          <td>
            {{pais.food1}}
          </td>
          <td>
            {{Number((pais.food4).toFixed(2)).toLocaleString()}}
          </td>
          <td>
            {{Number((pais.roomMin).toFixed(2)).toLocaleString()}}
          </td>
          <td>
            {{Number((pais.bus).toFixed(2)).toLocaleString()}}
          </td>
          <td>
            {{Number((pais.subway).toFixed(2)).toLocaleString()}}
          </td>
          <td>
            {{Number((pais.light).toFixed(2)).toLocaleString()}}
          </td>
          <td>
            {{Number((pais.water).toFixed(2)).toLocaleString()}}
          </td>
          <td>
            {{Number((pais.gas).toFixed(2)).toLocaleString()}}
          </td>
          <td>
            {{Number((pais.internet).toFixed(2)).toLocaleString()}}
          </td>
          <td>
            {{Number((pais.tlf).toFixed(2)).toLocaleString()}}
            </td>
          <td>
            {{Number((pais.gasoil).toFixed(2)).toLocaleString()}}
          </td>
          <td>
            {{pais.IVA}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const countries = require('country-list');

export default {

  name: 'Admin',

  data() {
    return {
      c: countries,
      data: [],
    };
  },
  mounted() {
    this.axios.post('/admin').then((res) => {
      this.data = res.data;
    });
  },
  methods: {
  },
};
</script>

<style lang="css" scoped>
div {
  text-align: center;
}
table {
  margin: auto;
}
</style>
