<template>
  <div id="app">
    <div v-if="isLoading" onmousedown="return false" class="loading">
      <img src="@/assets/refresh.png">
    </div>
    <div id="login">
      <div class="botonesUser">
        <span v-if="isLogged"> <i>Has ingresado como {{ user }} <br></i></span>
        <button v-if="!isLogged" @click="showModal(false)">Aportar</button>
        <button v-if="!isLogged" @click="showModal(true)">Registrarse</button>
        <button v-if="isLogged && !goingToAportar" @click="showAportar()">Aportar</button>
        <button v-if="isLogged" @click="logout()">Salir</button>
      </div>
      <div v-if="submitDone" class="loginModal login" style="color: #40798c">
        ¡Aporte agregado con éxito!
      </div>
      <div v-if="!isLogged" :class="{loginModal:showLoginModal}" class="login">
        <form @keydown.esc="hideModal()">
          <input v-model="user" id="usuario" name="usuario" placeholder="usuario">

          <input v-if="goingToRegister" id="password"
          type="password" name="password" placeholder="contraseña" autocomplete="off">

          <input v-else @keyup.enter="logear()" id="password" type="password"
          name="password" placeholder="contraseña" autocomplete="off">

          <input v-if="goingToRegister" @keyup.enter="registrar()" id="email"
          type="email" placeholder="correo">

          <span class="error" v-if="dataLeftError">Error: Todos los campos son obligatorios.
          <br></span>
          <span class="error" v-if="loginError">Error: Credenciales no concuerdan.<br></span>
          <span class="error" v-if="activeAlreadyError">Error: Sesión activa sin cerrar.
          Se han cerrado todas las sesiones.<br>Vuelva a ingresar.<br></span>
          <span class="error" v-if="dataError">Error: usuario/correo no admite espacios.
          <br>Largo de contraseña no puede ser menor a 8.<br></span>
          <span class="error" v-if="userAlreadyError">Error: usuario ya registrado.<br></span>
          <span class="error" v-if="emailAlreadyError">Error: correo ya registrado.<br></span>


          <input v-if="goingToRegister" type="button" @click="registrar()" name="logginBtn"
          value="Registrarse">

          <input v-else type="button" @click="logear()" name="logginBtn" value="Ingresar">
          <a @click.prevent="showModal(true)" class="oReg" v-if="!goingToRegister">
          <br>registrarse</a>
        </form>
      </div>
      <div :class="{bgModal:showLoginModal}" @click="hideModal()"></div>
    </div>

    <keep-alive>
      <AportarIngresos @activeLogin="checkLogin()" @failSubmit="failSubmit()"
      v-if="goingToAportar" @closeAportar="goingToAportar=false" @successSubmit="successSubmit()"
      :user="user"></AportarIngresos>
    </keep-alive>

    <div class="period" v-if="!goingToAportar">
      <div class="periodText" :class="{ activePeriod: daysSince == 999 }">
        <span @click="refreshTables(999)">Siempre</span>
      </div>
      <div class="periodText" :class="{ activePeriod: daysSince == 365 }">
        <span @click="refreshTables(365)">Último año</span>
      </div>
      <div class="periodText" :class="{ activePeriod: daysSince == 30 }">
        <span @click="refreshTables(30)">Último mes</span>
      </div>
      <div class="periodText" :class="{ activePeriod: daysSince == 7 }">
        <span @click="refreshTables(7)">Última semana</span>
      </div>
      <div class="periodText" :class="{ activePeriod: daysSince == 0 }">
        <span @click="refreshTables(0)">Últimos aportes</span>
      </div>
    </div>

    <TablasPaises v-if="!goingToAportar" :data="tableData"></TablasPaises>
  </div>
</template>
<!-- Esta vista se puede separar en 3 componentes: Login, aportar y Tabla.
  Evito hacerlo ahora por comodidad. -->

<script>
import AportarIngresos from '@/components/AportarIngresos.vue';
import TablasPaises from '@/components/TablasPaises.vue';

export default {

  name: 'Ingress',
  components: {
    AportarIngresos,
    TablasPaises,
  },
  data() {
    return {
      isLogged: false,
      isLoading: false,
      goingToRegister: false,
      goingToAportar: false,
      showLoginModal: false,
      submitDone: false,
      daysSince: 30,
      dataLeftError: false,
      loginError: false,
      activeAlreadyError: false,
      dataError: false,
      userAlreadyError: false,
      emailAlreadyError: false,
      tableData: [],
      user: '',
    };
  },
  mounted() {
    this.checkLogin();
    this.refreshTables(30);
  },
  methods: {
    refreshTables(dias) {
      this.isLoading = true;
      this.axios.post('/paises', { dias }).then((res) => {
        this.isLoading = false;
        let arr = res.data;
        if (dias > 0) {
          arr.forEach((x) => {
            // eslint-disable-next-line
            x.countryCode = x._id;
          });
          arr = arr.sort((x, y) => x.countryCode > y.countryCode);
        }
        this.daysSince = dias;
        this.tableData = arr;
      });
    },
    checkLogin() {
      this.isLoading = true;
      this.axios.post('isLogged').then((res) => {
        this.user = res.data.user;
        this.isLogged = res.data.logeado;
        if (this.goingToAportar && !this.isLogged) {
          this.activeAlreadyError = true;
          this.showModal(false);
          this.goingToAportar = false;
        }
        this.isLoading = false;
      // eslint-disable-next-line
    }).catch(err => console.error(err));
    },
    showModal(register) {
      this.showLoginModal = true;
      // eslint-disable-next-line
      this.goingToRegister = register;
      // Poner delay de animación
      if (!this.isLogged) setTimeout(() => document.getElementById('usuario').focus(), 500);
    },
    hideModal() {
      this.showLoginModal = false;
      this.dataLeftError = false;
      this.loginError = false;
      this.dataError = false;
      this.userAlreadyError = false;
      this.emailAlreadyError = false;
      this.activeAlreadyError = false;
      this.submitDone = false;
      document.getElementById('usuario').blur();
      document.getElementById('password').blur();
      document.getElementById('password').value = '';
    },
    logout() {
      this.isLoading = true;
      this.axios.post('logout').then(() => {
        this.isLogged = false;
        this.isLoading = false;
        this.goingToAportar = false;
      // eslint-disable-next-line
      }).catch(err => console.error(err));
    },
    logear() {
      this.dataLeftError = false;
      this.loginError = false;
      this.dataError = false;
      this.userAlreadyError = false;
      this.emailAlreadyError = false;
      const data = {
        user: this.user,
        pass: document.getElementById('password').value,
      };
      // eslint-disable-next-line
      if (data.user.length === 0 || data.pass.length === 0) {
        this.dataLeftError = true;
        return;
      }
      if (/\s/.test(data.user) || data.pass.length < 8) {
        this.dataError = true;
        return;
      }
      this.isLoading = true;
      this.axios.post('/login', data).then((res) => {
        this.isLoading = false;
        if (res.data === 2) {
          this.activeAlreadyError = true;
        } else if (res.data === 5) {
          this.activeAlreadyError = true;
        } else if (res.data === 0) {
          this.loginError = true;
        } else {
          this.isLogged = res.data;
          this.hideModal();
          this.showAportar();
        }
        // eslint-disable-next-line
      }).catch(err => console.error(err));
    },
    registrar() {
      this.dataLeftError = false;
      this.loginError = false;
      this.dataError = false;
      this.userAlreadyError = false;
      this.emailAlreadyError = false;
      const data = {
        user: this.user,
        pass: document.getElementById('password').value,
        email: document.getElementById('email').value,
      };
      const emailRegex = /^([A-Z]|[a-z]|[0-9]|(([A-Z]|[a-z]|[0-9])+(\.|_)+([A-Z]|[a-z]|[0-9]))+)+@([A-Z]|[a-z]|[0-9])+(\.([A-Z]|[a-z])+)+$/;
      // eslint-disable-next-line
      if (data.user.length === 0 || /\s/.test(data.user) || !(emailRegex.test(data.email)) || data.pass.length < 8) {
        this.dataError = true;
        return;
      }
      this.isLoading = true;
      this.axios.post('register', data).then((res) => {
        this.isLoading = false;
        if (res.data === 2) {
          this.dataError = true;
        } else if (res.data === 3) {
          this.userAlreadyError = true;
        } else if (res.data === 4) {
          this.emailAlreadyError = true;
        } else {
          this.isLogged = res.data;
          if (this.isLogged) this.showLoginModal = false;
        }
      }).catch((err) => {
        this.isLoading = false;
        this.dataError = true;
        // eslint-disable-next-line
        console.error(err);
      });
    },
    showAportar() {
      this.goingToAportar = true;
    },
    failSubmit() {
      this.isLogged = false;
      this.user = '';
      this.goingToAportar = false;
      this.activeAlreadyError = true;
      this.showModal(false);
    },
    successSubmit() {
      this.goingToAportar = false;
      this.showModal();
      this.submitDone = true;
      this.refreshTables(this.daysSince);
    },
  },
};
</script>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  z-index: 2;
}

.loading img {
  pointer-events: none;
  position: relative;
  width: 6em;
  animation: loading 0.5s linear infinite;
  top: 35vh;
}

@keyframes loading {
  0% {
    transform: rotate3d(0, 0, 1, 360deg)
  }
  100% {
    transform: rotate3d(0, 0, 1, 180deg);
  }

}
.login {
  background-color: white;
  width: fit-content;
  padding: 50px 50px 30px 50px;
  border-radius: 5px;
  box-shadow: black 5px 5px 5px;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: -20em;
  transition: transform ease 0.5s;
  z-index: 1;
}

.loginModal {
  transform: translate3d(0, 26em, 0);
}

.bgModal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.botonesUser {
  text-align: right;
}

.error {
  color: red;
}

.periodText {
  display: inline-block;
  border-bottom: 1.3em #1f363d solid;
  border-left: 5px transparent solid;
  border-right: 5px transparent solid;
  width: fit-content;
  height: 0;
}

.periodText span:hover {
  color: #9ec1a3;
}

.activePeriod span:hover {
  color: #1f363d;
}

.periodText span {
  position: relative;
  cursor: pointer;
}

.activePeriod, .activePeriod:hover {
  border-bottom: 1.3em #b0bea6 solid;
  color: #1f363d;
}

button, input[type=button] {
  all: unset;
  background-color: #1f363d;
  border-radius: 2px;
  box-shadow: black 1px 1px 5px;
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: 1.2em;
  margin: 0.5em;
}

form input {
  display: block;
  margin: auto;
}

input[type=button] {
  margin-top: 1.2em;
}

button:hover, input[type=button]:hover {
  color: #9ec1a3;
  box-shadow: black 1px 1px 10px;
}
button:active, input[type=button]:active {
  box-shadow: none;
}

.oReg {
  font-size: 0.8em;
  cursor: pointer;
  text-decoration: underline;
  color: #1f363d;
}

@media screen and (max-width: 510px){
  .botonesUser {
    font-size: 0.9em;
  }
}

</style>
