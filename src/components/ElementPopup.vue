<template>
  <div>
    <div class="info">
      <div v-for="item in data" :key="item">
        {{item}}
      </div>
    </div>
    <div class="dummyBG" @click="$emit('closePopup')"></div>
  </div>
</template>

<script>
export default {

  name: 'ElementPopup',
  data() {
    return {
      innerWidth: '',
    };
  },
  props: {
    el: {
      type: null,
      required: true,
    },
    data: {
      type: null,
      required: true,
    },
  },
  created() {
    this.innerWidth = window.innerWidth;
  },
  mounted() {
    const code = this.data[0];
    if (this.data[0].length === 2) {
      this.data.pop();
      this.data.push('Cargando...');
      this.adjustPosition();
      this.axios.get(`https://restcountries.eu/rest/v2/alpha/${code}`).then((curAPI) => {
        // eslint-disable-next-line
        this.data.pop();
        this.data.push(`${curAPI.data.currencies[0].name}`);
        this.adjustPosition();
      });
    } else {
      this.adjustPosition();
    }
  },
  methods: {
    adjustPosition() {
      const DOMRect = this.el.getBoundingClientRect();
      const infoEl = document.getElementsByClassName('info')[0];
      // eslint-disable-next-line
      infoEl.style.top = `${DOMRect.y + DOMRect.height + window.scrollY + 4}px`;
      // eslint-disable-next-line
      infoEl.style.left = `${DOMRect.x + DOMRect.width / 4}px`;
      const statusEl = infoEl.getBoundingClientRect();
      if (statusEl.right > this.innerWidth) {
        infoEl.style.left = `${DOMRect.left + DOMRect.width / 1.3 - statusEl.width}px`;
        infoEl.className = 'info reverse';
        document.styleSheets[0].insertRule(`.reverse::before { right: ${-(DOMRect.left + DOMRect.width / 4 - statusEl.width)}px }`, 0);
      } else {
        infoEl.className = 'info';
      }
    },
  },
};
</script>

<style lang="css" scoped>
.info {
  position: absolute;
  border: 2px solid;
  border-radius: 5px;
  width: fit-content;
  max-width: 100vw;
  padding: 5px;
  height: fit-content;
  background-color: #1f363d;
  box-shadow: black 2px 5px 5px 2px;
  transform-style: preserve-3d;
  z-index: 1;
}
.info::before {
  display: block;
  box-sizing: border-box;
  position: absolute;
  top: -10px;
  content: "";
  width: 16px;
  height: 16px;
  border-left: 8px solid;
  border-top: 8px solid;
  box-shadow: black 2px 2px 10px 2px;
  transform: rotate3d(0, 0, 1, 45deg) translateZ(-1px);

  --background-color: #cfe0c3;
}
.dummyBG {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0,0,0,0.1);
}
</style>
