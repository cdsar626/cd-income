<template>
  <div id="tablas">
    <table>
    <!--table @scroll="updateSlider()">
      <div draggable="true" @drag.native="updateScroll($event)" id="slider"></div>-->
      <thead>
        <tr>
          <th>pais</th>
          <th>moneda</th>
          <th>ingreso</th>
          <th>Canasta básica</th>
          <th>{{ data.length && data[0].user ? 'Habitación' : 'Hab. promed.' }}</th>
          <th>Bus</th>
          <th>Metro</th>
          <th>Luz</th>
          <th>Agua</th>
          <th>Gas</th>
          <th>Internet</th>
          <th>Telefono</th>
          <th>Gasolina</th>
          <th>IVA</th>
          <th v-if="data.length && data[0].user">Usuario</th>
          <th v-if="data.length && data[0].user">Fecha</th>
          </tr>
      </thead>
      <tbody>
        <tr v-for="pais in data" :key="pais._id">
          <td :title="c.getName(pais.countryCode)">{{c.getName(pais.countryCode)}}
          </td>
          <td class="question" @click="tableClick($event)">
            <img src="../assets/icon_question.png">
          </td>
          <td>
            {{pais.monthlyIngress ? Number((pais.monthlyIngress)
            .toFixed(2)).toLocaleString() : '-' }}
          </td>
          <td class="question" @click="tableClick($event)">
            {{pais.food4 ? Number((pais.food4).toFixed(2)).toLocaleString() : '-' }}
            <img src="../assets/icon_question.png">
          </td>
          <td v-if="pais.user">
            {{pais.roomMin ? Number((pais.roomMin).toFixed(2)).toLocaleString() : '-' }}
          </td>
          <td v-else class="question" @click="tableClick($event)">
            {{pais.room ? Number((pais.room).toFixed(2)).toLocaleString() : '-' }}
            <img src="../assets/icon_question.png">
          </td>
          <td>
            {{pais.bus ? Number((pais.bus).toFixed(2)).toLocaleString() : '-' }}
          </td>
          <td>
            {{pais.subway ? Number((pais.subway).toFixed(2)).toLocaleString() : '-' }}
          </td>
          <td>
            {{pais.light ? Number((pais.light).toFixed(2)).toLocaleString() : '-' }}
          </td>
          <td>
            {{pais.water ? Number((pais.water).toFixed(2)).toLocaleString() : '-' }}
          </td>
          <td>
            {{pais.gas ? Number((pais.gas).toFixed(2)).toLocaleString() : '-' }}
          </td>
          <td>
            {{pais.internet ? Number((pais.internet).toFixed(2)).toLocaleString() : '-' }}
          </td>
          <td>
            {{pais.tlf ? Number((pais.tlf).toFixed(2)).toLocaleString() : '-' }}
            </td>
          <td>
            {{pais.gasoil ? Number((pais.gasoil).toFixed(2)).toLocaleString() : '-' }}
          </td>
          <td>
            {{pais.IVA ? pais.IVA : '-' }}
          </td>
          <td v-if="data.length && data[0].user">
            {{ pais.user }}
          </td>
          <td v-if="data.length && data[0].user"
          :title="(new Date(pais.date)).toLocaleDateString() + ' '
          + (new Date(pais.date)).toLocaleTimeString()">
            {{ (new Date(pais.date)).toLocaleDateString() }}
          </td>
        </tr>
      </tbody>
    </table>
    <ElementPopup v-if="activePopup" :el="popupEl" :data="dataPopup"
    @closePopup="closePopup"></ElementPopup>
  </div>
</template>

<script>
import ElementPopup from '@/components/ElementPopup.vue';

const countries = require('country-list');

export default {
  name: 'TablasPaises',
  components: {
    ElementPopup,
  },
  data() {
    return {
      c: countries,
      activePopup: false,
      popupEl: {},
      dataPopup: [],
      // scrollLeftMax: '',
    };
  },
  props: {
    data: Array,
  },
  methods: {
    tableClick(cell) {
      this.popupEl = cell.target;
      const row = this.popupEl.parentNode.rowIndex - 1;
      if (this.popupEl.cellIndex === 1) {
        // eslint-disable-next-line
        this.dataPopup = [`${this.data[row].countryCode}`];
      } else if (this.popupEl.cellIndex === 3) {
        this.dataPopup = [
          `canasta básica (4 personas): ${this.data[row].food4}`,
          `canasta para 1 persona aprox.: ${this.data[row].food1}`,
        ];
      } else if (this.popupEl.cellIndex === 4) {
        this.dataPopup = [
          `Habitación promedio: ${this.data[row].room}`,
          `Habitación (mínimo): ${this.data[row].roomMin}`,
          `Habitación (máximo):${this.data[row].roomMax}`,
        ];
      }
      this.activePopup = true;
    },
    /*
    setScrollLeftMax() {
      this.scrollLeftMax = document.getElementsByTagName('table')[0].scrollLeftMax;
    },
    updateSlider() {
      const table = document.getElementsByTagName('table')[0];
      const slider = document.getElementById('slider');
      const toLeftMax = table.scrollLeft / this.scrollLeftMax;
      slider.style.left = `${toLeftMax * table.scrollWidth}px`;
    },
    updateScroll(event) {
      console.log(event.clientX);
    },
    */
    closePopup() {
      this.dataPopup = [];
      this.activePopup = false;
    },
  }, /*
  mounted() {
    this.setScrollLeftMax();
  },
  */
};
</script>

<style lang="css" scoped>
#slider {
  display: block;
  position: relative;
  top: -0px;
  width: 10px;
  height: 5px;
  background-color: black;
}

.question {
  cursor: pointer;
}

.question img{
  height: 0.8em;
  pointer-events: none;
  user-select: none;
}
.question:hover {
  filter: invert(20%);
}

table {
  display: block;
  margin: auto;
  border: black 1px solid;
  border-left: transparent ;
  border-right: transparent ;
  border-radius: 3px;
  border-spacing: 0;
  border-collapse: collapse;
  background-color: #cfe0c3;
  color: #1f363d;
  box-shadow: black 2px 5px 20px;
  width: fit-content;
  max-width: 90vw;
  overflow-x: auto;
}
td {
  white-space: nowrap;
}
td:first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 12ch;
}
tr {
  border-top: #1f363d40 1px solid;
  max-width: 90%;
}
table, th:first-child, thead tr:first-child {
  border-top: none;
}
tr:last-child {
  border-radius: 3px;
}

td, th {
  padding: 2px 5px;
}

th:nth-child(2n), td:nth-child(2n) {
  background-color: rgba(0,0,0,0.1);
}


@media screen and (max-width: 510px){
  th:nth-child(n+7) {
    --display: none;
  }
  table {
    max-width: 100vw;
  }
}

</style>
