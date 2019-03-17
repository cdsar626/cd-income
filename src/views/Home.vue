<template>
  <div class="home">
    <HelloWorld msg='Aplicación de datos de ingresos-gastos "mínimos" para distintos países
    alimentada y contribuida por la comunidad' />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>
