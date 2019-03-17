<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Esta aplicación está pensada para servir de referencia, ver qué países tienen mejores
      oportunidades de vida tomando como puntos de partida el ingreso mínimo oficial
      (o más popularizado) y el costo de los diversos servicios básicos.
      <br><br> Los datos son proporcionados en su mayoría por los mismos habitantes de los países,
      por lo cuál pueden diferir con los datos oficiales.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: center;
}
p {
  margin: auto;
  text-align: justify;
  font-size: 1.5em;
  max-width: 75ch;
}
@media screen and (max-width: 510px){
  h1 {
    font-size: 1.5em;
  }
}
</style>
