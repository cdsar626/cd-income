<template>
  <div id="app">

    <div id="nav">
      <div class="logo"><img src="@/assets/logo_noname.png"></div>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/paises">Países</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </div>
    <div id="wrapper">
      <div class="content">
        <keep-alive><router-view/></keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actual: this.$route.path,
    };
  },
  watch: {
    $route() {
      this.actual = this.$route.path;
    },
  },
  mounted() {

    /* Swipe to change route
    let startX = 0;
    let startY = 0;
    let curX = 0;
    let curY = 0;
    let distance = 0;
    document.getElementById('wrapper').addEventListener('pointerdown', (ev) => {
      startX = ev.screenX;
      startY = ev.screenY;
    }, { passive: true });
    document.getElementById('wrapper').addEventListener('touchmove', (ev) => {
      curX = ev.touches[0].screenX;
      curY = ev.touches[0].screenY;
      distance = Math.abs(startX - curX);
      if (distance > 2.5 * Math.abs(startY - curY)) {
        ev.preventDefault();
      }
    });
    document.getElementById('wrapper').addEventListener('pointerup', (ev) => {
      curX = (curX === 0) ? ev.screenX : curX;
      curY = (curY === 0) ? ev.screenY : curY;
      distance = Math.abs(startX - curX);
      if (distance > window.innerWidth / 3 && distance > 2.5 * Math.abs(startY - curY)) {
        if (startX > curX) {
          // eslint-disable-next-line
          if (this.actual === '/') this.$router.push('/paises');
          else if (this.actual === '/paises') this.$router.push('/about');
        } else {
          // eslint-disable-next-line
          if (this.actual === '/paises') this.$router.push('/');
          else if (this.actual === '/about') this.$router.push('/paises');
        }
      }
      startX = 0;
      startY = 0;
      curX = 0;
      curY = 0;
      distance = 0;
    }, { passive: true });
    */
  },
};
</script>

<style>
html {
  background-color: #40798c;
}
@font-face {
  font-family: timeless;
  src: url('./assets/Timeless.ttf');
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  color: #cfe0c3;
  width: 100vw;
  max-width: 100%;
  font-family: timeless
}
@font-face {
  font-family: NeutonCursive;
  src: url('./assets/NeutonCursive.ttf');
}
body::after {
  content:  "";
  background: url('./assets/pata_furry_cd_A.png') no-repeat center;
  background-size: 50vw;
  opacity: 0.3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: -2;
}
#nav {
  position: fixed;
  top: 0;
  width: 100vw;
  background-color: #1f363d;
  height: 5em;
  font-family: NeutonCursive
}
#nav ul {
  list-style: none;
  margin: 0 20px 0 0;
  padding: 0;
  float: right;
  display: flex;
  height: 5em;
}
#nav ul li a {
  display: inline-block;
  text-decoration: none;
  color: #cfe0c3;
  padding: 0.75em 1em;
  font-size: 2em;
  line-height: 1em;
  outline: none;
}
#nav ul li:first-child a{
  padding-left: 0px;
}
#nav ul li a.router-link-exact-active {
  color: #9ec1a3;
  font-style: oblique;
}
#nav ul li a:focus {
  outline: none;
}
.logo {
  pointer-events: none;
  float: left;
  height: 5em;
  user-select: none;
}
.logo img {
  height: 4em;
  padding: 0.5em 20px;
  filter: invert(100%);
  outline: none;
}
.content {
  margin-top: 5.5em;
  margin-left: 30px;
  margin-right: 30px;
  text-align: center;
}

@media screen and (max-width: 510px){
  body::after {
    background-size: 80vw;
  }
  #nav {
    height: 3em;
    text-align: center;
  }
  #nav ul {
    float: none;
    width: fit-content;
    margin: auto;
  }
  #nav ul li a{
    font-size: 1.7em;
    padding: 0.3em 1em;
  }
  #nav ul li:first-child a{
    padding-left: 1em;
  }
  .logo {
    display: none;
  }
  .content {
    margin: 4em 0 0 0;
    display: flex;
    flex-wrap: nowrap;
  }
  #wrapper::after {
    display: block;
    content: "";
    height: 4em;
  }
}
</style>
