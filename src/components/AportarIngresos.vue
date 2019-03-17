<template>
  <div class="aportar">
    <div class="close"><span @click="close()">X</span></div>
    <div class="paso1" :class="{activo: step===1}">
      <span>Introduzca los valores en su moneda local.
      <span :title="currency">({{ currency }})<br></span>
      Para mayor fiabilidad sólo puede enviar datos desde el país de
      donde está accediendo.<br>Aún así, puede enviar datos de otros
      países pero serán revisados manualmente antes de tomarse en cuenta.<br>
      También tome en cuenta que sólo puede enviar datos 1 vez cada 7 días.<br>
      No es obligatorio rellenar todos los campos. Rellene los que usted
      tenga familiaridad.<br></span>
      <div class="groupInput">
        <div>
          <label for="country"></label>
          <select v-model="country" id="country" :disabled="!specialCase">
            <option disabled value="">Seleccione país.</option>
            <option value="AF">Afghanistan</option>
            <option value="AX">Åland Islands</option>
            <option value="AL">Albania</option>
            <option value="DZ">Algeria</option>
            <option value="AS">American Samoa</option>
            <option value="AD">Andorra</option>
            <option value="AO">Angola</option>
            <option value="AI">Anguilla</option>
            <option value="AQ">Antarctica</option>
            <option value="AG">Antigua and Barbuda</option>
            <option value="AR">Argentina</option>
            <option value="AM">Armenia</option>
            <option value="AW">Aruba</option>
            <option value="AU">Australia</option>
            <option value="AT">Austria</option>
            <option value="AZ">Azerbaijan</option>
            <option value="BS">Bahamas</option>
            <option value="BH">Bahrain</option>
            <option value="BD">Bangladesh</option>
            <option value="BB">Barbados</option>
            <option value="BY">Belarus</option>
            <option value="BE">Belgium</option>
            <option value="BZ">Belize</option>
            <option value="BJ">Benin</option>
            <option value="BM">Bermuda</option>
            <option value="BT">Bhutan</option>
            <option value="BO">Bolivia, Plurinational State of</option>
            <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
            <option value="BA">Bosnia and Herzegovina</option>
            <option value="BW">Botswana</option>
            <option value="BV">Bouvet Island</option>
            <option value="BR">Brazil</option>
            <option value="IO">British Indian Ocean Territory</option>
            <option value="BN">Brunei Darussalam</option>
            <option value="BG">Bulgaria</option>
            <option value="BF">Burkina Faso</option>
            <option value="BI">Burundi</option>
            <option value="KH">Cambodia</option>
            <option value="CM">Cameroon</option>
            <option value="CA">Canada</option>
            <option value="CV">Cape Verde</option>
            <option value="KY">Cayman Islands</option>
            <option value="CF">Central African Republic</option>
            <option value="TD">Chad</option>
            <option value="CL">Chile</option>
            <option value="CN">China</option>
            <option value="CX">Christmas Island</option>
            <option value="CC">Cocos (Keeling) Islands</option>
            <option value="CO">Colombia</option>
            <option value="KM">Comoros</option>
            <option value="CG">Congo</option>
            <option value="CD">Congo, the Democratic Republic of the</option>
            <option value="CK">Cook Islands</option>
            <option value="CR">Costa Rica</option>
            <option value="CI">Côte d'Ivoire</option>
            <option value="HR">Croatia</option>
            <option value="CU">Cuba</option>
            <option value="CW">Curaçao</option>
            <option value="CY">Cyprus</option>
            <option value="CZ">Czech Republic</option>
            <option value="DK">Denmark</option>
            <option value="DJ">Djibouti</option>
            <option value="DM">Dominica</option>
            <option value="DO">Dominican Republic</option>
            <option value="EC">Ecuador</option>
            <option value="EG">Egypt</option>
            <option value="SV">El Salvador</option>
            <option value="GQ">Equatorial Guinea</option>
            <option value="ER">Eritrea</option>
            <option value="EE">Estonia</option>
            <option value="ET">Ethiopia</option>
            <option value="FK">Falkland Islands (Malvinas)</option>
            <option value="FO">Faroe Islands</option>
            <option value="FJ">Fiji</option>
            <option value="FI">Finland</option>
            <option value="FR">France</option>
            <option value="GF">French Guiana</option>
            <option value="PF">French Polynesia</option>
            <option value="TF">French Southern Territories</option>
            <option value="GA">Gabon</option>
            <option value="GM">Gambia</option>
            <option value="GE">Georgia</option>
            <option value="DE">Germany</option>
            <option value="GH">Ghana</option>
            <option value="GI">Gibraltar</option>
            <option value="GR">Greece</option>
            <option value="GL">Greenland</option>
            <option value="GD">Grenada</option>
            <option value="GP">Guadeloupe</option>
            <option value="GU">Guam</option>
            <option value="GT">Guatemala</option>
            <option value="GG">Guernsey</option>
            <option value="GN">Guinea</option>
            <option value="GW">Guinea-Bissau</option>
            <option value="GY">Guyana</option>
            <option value="HT">Haiti</option>
            <option value="HM">Heard Island and McDonald Islands</option>
            <option value="VA">Holy See (Vatican City State)</option>
            <option value="HN">Honduras</option>
            <option value="HK">Hong Kong</option>
            <option value="HU">Hungary</option>
            <option value="IS">Iceland</option>
            <option value="IN">India</option>
            <option value="ID">Indonesia</option>
            <option value="IR">Iran, Islamic Republic of</option>
            <option value="IQ">Iraq</option>
            <option value="IE">Ireland</option>
            <option value="IM">Isle of Man</option>
            <option value="IL">Israel</option>
            <option value="IT">Italy</option>
            <option value="JM">Jamaica</option>
            <option value="JP">Japan</option>
            <option value="JE">Jersey</option>
            <option value="JO">Jordan</option>
            <option value="KZ">Kazakhstan</option>
            <option value="KE">Kenya</option>
            <option value="KI">Kiribati</option>
            <option value="KP">Korea, Democratic People's Republic of</option>
            <option value="KR">Korea, Republic of</option>
            <option value="KW">Kuwait</option>
            <option value="KG">Kyrgyzstan</option>
            <option value="LA">Lao People's Democratic Republic</option>
            <option value="LV">Latvia</option>
            <option value="LB">Lebanon</option>
            <option value="LS">Lesotho</option>
            <option value="LR">Liberia</option>
            <option value="LY">Libya</option>
            <option value="LI">Liechtenstein</option>
            <option value="LT">Lithuania</option>
            <option value="LU">Luxembourg</option>
            <option value="MO">Macao</option>
            <option value="MK">Macedonia, the former Yugoslav Republic of</option>
            <option value="MG">Madagascar</option>
            <option value="MW">Malawi</option>
            <option value="MY">Malaysia</option>
            <option value="MV">Maldives</option>
            <option value="ML">Mali</option>
            <option value="MT">Malta</option>
            <option value="MH">Marshall Islands</option>
            <option value="MQ">Martinique</option>
            <option value="MR">Mauritania</option>
            <option value="MU">Mauritius</option>
            <option value="YT">Mayotte</option>
            <option value="MX">Mexico</option>
            <option value="FM">Micronesia, Federated States of</option>
            <option value="MD">Moldova, Republic of</option>
            <option value="MC">Monaco</option>
            <option value="MN">Mongolia</option>
            <option value="ME">Montenegro</option>
            <option value="MS">Montserrat</option>
            <option value="MA">Morocco</option>
            <option value="MZ">Mozambique</option>
            <option value="MM">Myanmar</option>
            <option value="NA">Namibia</option>
            <option value="NR">Nauru</option>
            <option value="NP">Nepal</option>
            <option value="NL">Netherlands</option>
            <option value="NC">New Caledonia</option>
            <option value="NZ">New Zealand</option>
            <option value="NI">Nicaragua</option>
            <option value="NE">Niger</option>
            <option value="NG">Nigeria</option>
            <option value="NU">Niue</option>
            <option value="NF">Norfolk Island</option>
            <option value="MP">Northern Mariana Islands</option>
            <option value="NO">Norway</option>
            <option value="OM">Oman</option>
            <option value="PK">Pakistan</option>
            <option value="PW">Palau</option>
            <option value="PS">Palestinian Territory, Occupied</option>
            <option value="PA">Panama</option>
            <option value="PG">Papua New Guinea</option>
            <option value="PY">Paraguay</option>
            <option value="PE">Peru</option>
            <option value="PH">Philippines</option>
            <option value="PN">Pitcairn</option>
            <option value="PL">Poland</option>
            <option value="PT">Portugal</option>
            <option value="PR">Puerto Rico</option>
            <option value="QA">Qatar</option>
            <option value="RE">Réunion</option>
            <option value="RO">Romania</option>
            <option value="RU">Russian Federation</option>
            <option value="RW">Rwanda</option>
            <option value="BL">Saint Barthélemy</option>
            <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
            <option value="KN">Saint Kitts and Nevis</option>
            <option value="LC">Saint Lucia</option>
            <option value="MF">Saint Martin (French part)</option>
            <option value="PM">Saint Pierre and Miquelon</option>
            <option value="VC">Saint Vincent and the Grenadines</option>
            <option value="WS">Samoa</option>
            <option value="SM">San Marino</option>
            <option value="ST">Sao Tome and Principe</option>
            <option value="SA">Saudi Arabia</option>
            <option value="SN">Senegal</option>
            <option value="RS">Serbia</option>
            <option value="SC">Seychelles</option>
            <option value="SL">Sierra Leone</option>
            <option value="SG">Singapore</option>
            <option value="SX">Sint Maarten (Dutch part)</option>
            <option value="SK">Slovakia</option>
            <option value="SI">Slovenia</option>
            <option value="SB">Solomon Islands</option>
            <option value="SO">Somalia</option>
            <option value="ZA">South Africa</option>
            <option value="GS">South Georgia and the South Sandwich Islands</option>
            <option value="SS">South Sudan</option>
            <option value="ES">Spain</option>
            <option value="LK">Sri Lanka</option>
            <option value="SD">Sudan</option>
            <option value="SR">Suriname</option>
            <option value="SJ">Svalbard and Jan Mayen</option>
            <option value="SZ">Swaziland</option>
            <option value="SE">Sweden</option>
            <option value="CH">Switzerland</option>
            <option value="SY">Syrian Arab Republic</option>
            <option value="TW">Taiwan, Province of China</option>
            <option value="TJ">Tajikistan</option>
            <option value="TZ">Tanzania, United Republic of</option>
            <option value="TH">Thailand</option>
            <option value="TL">Timor-Leste</option>
            <option value="TG">Togo</option>
            <option value="TK">Tokelau</option>
            <option value="TO">Tonga</option>
            <option value="TT">Trinidad and Tobago</option>
            <option value="TN">Tunisia</option>
            <option value="TR">Turkey</option>
            <option value="TM">Turkmenistan</option>
            <option value="TC">Turks and Caicos Islands</option>
            <option value="TV">Tuvalu</option>
            <option value="UG">Uganda</option>
            <option value="UA">Ukraine</option>
            <option value="AE">United Arab Emirates</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
            <option value="UM">United States Minor Outlying Islands</option>
            <option value="UY">Uruguay</option>
            <option value="UZ">Uzbekistan</option>
            <option value="VU">Vanuatu</option>
            <option value="VE">Venezuela, Bolivarian Republic of</option>
            <option value="VN">Viet Nam</option>
            <option value="VG">Virgin Islands, British</option>
            <option value="VI">Virgin Islands, U.S.</option>
            <option value="WF">Wallis and Futuna</option>
            <option value="EH">Western Sahara</option>
            <option value="YE">Yemen</option>
            <option value="ZM">Zambia</option>
            <option value="ZW">Zimbabwe</option>
          </select>
        </div>
        <div>
          <label class="labelCheckBox" for="specialCase">Caso Especial:</label>
          <input type="checkbox" v-model="specialCase" id="specialCase">
        </div>
      </div>
      <br>
      <div class="groupInput">
        <div>
          <label for="monthlyIngress">Ingreso Mensual</label>
          <input type="number" v-model="monthlyIngress" id="monthlyIngress" step="0.01"
          placeholder="0.00" min="0">
        </div>
        <div>
          <label for="food1">Canasta Básica (1 persona)</label>
          <input type="number" v-model="food1" id="food1" step="0.01"
          placeholder="0.00" min="0"
          @blur="calcularFood4">
        </div>
        <div>
          <label for="food4">Canasta Básica (4 persona)</label>
          <input type="number" v-model="food4" id="food4" step="0.01"
          placeholder="0.00" min="0"
          @blur="calcularFood1">
        </div>
      </div>
      <div class="groupInput">
        <div>
          <label for="bus">Bus</label>
          <input type="number" v-model="bus" id="bus" step="0.01"
          placeholder="0.00" min="0">
        </div>
        <div>
          <label for="subway">Metro</label>
          <input type="number" v-model="subway" id="subway" step="0.01"
          placeholder="0.00" min="0" @keyup.enter="next()">
        </div>
      </div>
    </div>
    <div class="paso2" :class="{activo: step===2}">
      <span>Los valores de los servicios deben ser referentes al periodo de
      un mes.<br>
      Tome como referencia el sueldo y consumo de 1 o 2 personas
      para establecer los próximos campos.</span>
      <div class="groupInput">
        <div>
          <label for="light">Luz</label>
          <input type="number" v-model="light" id="light" step="0.01"
          placeholder="0.00" min="0">
        </div>
        <div>
          <label for="water">Agua</label>
          <input type="number" v-model="water" id="water" step="0.01"
          placeholder="0.00" min="0">
        </div>
      </div>
      <div class="groupInput">
        <div>
          <label for="gas">Gas</label>
          <input type="number" v-model="gas" id="gas" step="0.01"
          placeholder="0.00" min="0">
        </div>
        <div>
          <label for="internet">Internet</label>
          <input type="number" v-model="internet" id="internet" step="0.01"
          placeholder="0.00" min="0" @keyup.enter="next()">
        </div>
      </div>
    </div>
    <div class="paso3" :class="{activo: step===3}">
      <span>El valor de la gasolina es por litro.<br>
        El valor del IVA es porcentual (ej: 12%).
        El valor de Habitación es mensual.<br></span>
      <div class="groupInput">
        <div>
          <label for="tlf">Teléfono</label>
          <input type="number" v-model="tlf" id="tlf" step="0.01"
          placeholder="0.00" min="0">
        </div>
        <div>
          <label for="gasoil">Gasolina</label>
          <input type="number" v-model="gasoil" id="gasoil" step="0.01"
          placeholder="0.00" min="0">
        </div>
      </div>
      <div class="groupInput">
        <div>
          <label for="IVA">IVA</label>
          <input type="number" v-model="IVA" id="IVA" step="0.01"
          placeholder="0.00" min="0">
        </div>
        <div>
          <label for="subway">Habitación</label>
          <input type="number" v-model="roomMin" id="roomMin" step="0.01"
          placeholder="0.00" min="0" @keyup.enter="submitAporte()">
        </div>
      </div>
    </div>
    <div class="botonesAportar">
      <span v-if="error">{{errorMsg}}</span>
      <button v-if="step!==1" @click="back()">Anterior</button>
      <button v-if="step!==3" @click="next()">Siguiente</button>
      <button v-else @click="submitAporte()">Enviar</button>
    </div>
  </div>
</template>

<script>
export default {

  name: 'AportarIngresos',
  data() {
    return {
      // step1
      country: '', // Code of country
      countryIP: '', // Code of ip's country
      currency: '', // Currency name - ip
      currencyCode: '', // Currency code - ip
      specialCase: false,
      monthlyIngress: '',
      food1: '',
      food4: '',
      bus: '',
      subway: '',
      // step2
      light: '',
      water: '',
      gas: '',
      internet: '',
      // step3
      tlf: '',
      gasoil: '',
      IVA: '',
      roomMin: '',
      roomMax: '',
      step: 1,
      errorMsg: '',
      error: false,
    };
  },
  props: {
    user: String,
  },
  methods: {
    next() {
      // eslint-disable-next-line
      this.step++;
      this.error = false;
      this.$emit('activeLogin');
    },
    back() {
      // eslint-disable-next-line
      this.step--;      
      this.error = false;
      this.$emit('activeLogin');
    },
    close() {
      this.error = false;
      this.$emit('closeAportar');
    },
    reset() {
      this.country = this.countryIP;
      this.specialCase = false;
      this.monthlyIngress = '';
      this.food1 = '';
      this.food4 = '';
      this.bus = '';
      this.subway = '';
      // step2
      this.light = '';
      this.water = '';
      this.gas = '';
      this.internet = '';
      // step3
      this.tlf = '';
      this.gasoil = '';
      this.IVA = '';
      this.roomMin = '';
      this.roomMax = '';
      this.step = 1;
      this.error = false;
      this.errorMsg = '';
    },
    calcularFood4() {
      if (this.food1.toString().length && !(/\s/.test(this.food1))) {
        // eslint-disable-next-line
        this.food4 = Math.round(this.food1 * 4 * 100) / 100;
      } else {
        this.food1 = '';
        this.food4 = '';
      }
    },
    calcularFood1() {
      if (this.food4.toString().length && !(/\s/.test(this.food4))) {
        // eslint-disable-next-line
        this.food1 = Math.round(this.food4 / 4 * 100) / 100;
      } else {
        this.food4 = '';
        this.food1 = '';
      }
    },
    submitAporte() {
      this.error = false;
      if (this.country === this.countryIP) this.specialCase = false;
      const aporte = {
        user: this.user,
        country: this.country,
        specialCase: this.specialCase,
        monthlyIngress: Number(this.monthlyIngress),
        food1: Number(this.food1),
        food4: Number(this.food4),
        bus: Number(this.bus),
        subway: Number(this.subway),
        light: Number(this.light),
        water: Number(this.water),
        gas: Number(this.gas),
        internet: Number(this.internet),
        tlf: Number(this.tlf),
        gasoil: Number(this.gasoil),
        IVA: Number(this.IVA),
        roomMin: Number(this.roomMin),
      };
      const total = aporte.monthlyIngress + aporte.food1
      + aporte.food4 + aporte.bus + aporte.subway + aporte.light
      + aporte.water + aporte.gas + aporte.internet + aporte.tlf
      + aporte.gasoil + aporte.IVA + aporte.roomMin;
      if (total === 0) {
        this.error = true;
        this.errorMsg = 'Error: todos los campos vacíos.';
        return;
      }
      this.$parent.isLoading = true;
      this.axios.post('aportar', aporte).then((res) => {
        if (res.data === -3) {
          this.$emit('failSubmit');
        } else if (res.data === -4) {
          this.error = true;
          this.errorMsg = 'Límite de submits por usuario alcanzado.';
        } else if (res.data === -5) {
          this.error = true;
          this.errorMsg = 'Límite de submits por ip alcanzado.';
        } else {
          this.reset();
          this.$emit('successSubmit');
        }
        this.$parent.isLoading = false;
      }).catch(() => {
        this.$parent.isLoading = false;
      });
    },
  },
  watch: {
    specialCase() {
      if (!this.specialCase) this.country = this.countryIP;
    },
    country() {
      this.axios.get(`https://restcountries.eu/rest/v2/alpha/${this.country}`).then((curAPI) => {
        // eslint-disable-next-line
        this.currency = curAPI.data.currencies[0].name;
        this.currencyCode = curAPI.data.currencies[0].code;
      });
    },
  },
  mounted() {
    this.$emit('activeLogin');
    if (this.countryIP === '') {
      this.axios.post('countryIP').then((res) => {
        this.countryIP = res.data;
        this.country = this.countryIP;
        // eslint-disable-next-line
      }).catch(err => console.log(err));
    }
  },
  activated() {
    this.step = 1;
  },
};
</script>

<style lang="css" scoped>
.aportar {
  height: 80%;
  margin: 0.5em auto;
  background-color: #cfe0c3;
  color: #1f363d;
  padding: 0.5em;
  box-shadow: black 10px 10px 10px 1px;
}
.close {
  position: relative;
  text-align: right;
}
.close > span {
  cursor: pointer;
}
span > span {
  cursor: help;
}
input[type="number"] {
  appearance: textfield;
  border: none;
  border-bottom: solid black 1px;
  text-align: right;
  transition: background 0.5s ease;
}
input[type="number"]:focus {
  background: linear-gradient(to bottom, transparent, white);
}
label {
  font-weight: bold;
  width: fit-content;
  font-size: 0.8em;
}
input, label {
  display: block;
  margin: auto;
}
.groupInput div{
  display: inline-block;
  margin: 0 5px;
}
.country div {
  display: inline-block;
}
.labelCheckBox, .labelCheckBox + input {
  display: inline-block;
}
.paso1, .paso2, .paso3 {
  display: none;
}
.activo {
  display: block;
}
.botonesAportar{
  text-align: right;
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
  color: #cfe0c3;
}
button:hover, input[type=button]:hover {
  color: #9ec1a3;
  box-shadow: black 1px 1px 10px;
}
button:active, input[type=button]:active {
  box-shadow: none;
}

@media screen and (max-width: 510px){
  input, select {
    max-width: 75vw;
    font-size: 1.5em;
  }
  label {
    font-size: 1em;
  }
}
</style>
