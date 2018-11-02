<template lang="html">
  <v-container fluid id="formComponent">
    <v-card class="section-def__card">
      <v-toolbar class="elevation-1 py-2" color="grey lighten-4">
        <v-tooltip bottom>
          <v-btn
          @click="goToList()"
          id="home"
          icon
          color="primary"
          slot="activator"
          >
          <v-icon> undo </v-icon>
          </v-btn>
          <span>
            Voltar
          </span>
        </v-tooltip>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-form ref="form" v-model="valid" @submit.prevent="save()" lazy-validation>
        <v-card-text class="pt-0">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  label="Nome"
                  id="name"
                  v-model="customer.name"
                  :rules="inputRules"
                  required
                  >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-select
                  label="Sexo"
                  id="sex"
                  v-model="customer.sex"
                  :items="sexType"
                  :rules="inputRules"
                  required
                  >
                </v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-menu
                  ref="menu"
                  id="menu"
                  :close-on-content-click="false"
                  v-model="menuDatePicker"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                  >
                  <v-text-field
                    slot="activator"
                    id="date_formatted"
                    label="Data de nascimento"
                    v-model="dateFormatted"
                    mask="##/##/####"
                    hint="DD/MM/YYYY"
                    persistent-hint
                    append-icon="event"
                    @blur="customer.date_of_birth = parseDate(dateFormatted)"
                    :rules="inputRules"
                    required
                    >
                  </v-text-field>
                  <v-date-picker
                    id="date_picker"
                    v-model="customer.date_of_birth"
                    scrollable
                    locale="pt-BR"
                    @input="datePicker"
                    >
                  </v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-text-field
                  label="CEP"
                  id="cep"
                  v-model="customer.cep"
                  mask="#####-###"
                  loading
                  counter
                  maxlength="8"
                  >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Número"
                  id="number"
                  type="number"
                  v-model="customer.number"
                  >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  label="Endereço"
                  id="address"
                  v-model="customer.address"
                  >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Complemento"
                  id="complement"
                  v-model="customer.complement"
                  >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Bairro"
                  id="neighborhood"
                  v-model="customer.neighborhood"
                  >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Cidade"
                  id="city"
                  v-model="customer.city"
                  readonly
                  >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Estado"
                  id="state"
                  v-model="customer.state"
                  readonly
                  >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 class="pt-3">
                <v-btn
                  id="save"
                  block
                  :loading="loading"
                  :disabled="loading || !valid"
                  color="primary"
                  type="submit"
                  > Salvar
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import MessageNotification from '@/mixins/MessageNotification'
import moment from 'moment'
import Service from './Service'

export default {
  mixins: [
    MessageNotification
  ],
  data: () => ({
    inputRules: [
      (v) => !!v || 'O preenchimento deste campo é obrigatório'
    ],
    menuDatePicker: false,
    dateFormatted: '',
    title: 'Cadastro de cliente',
    loading: false,
    valid: false,
    id: null,
    customer: {
      name: null,
      date_of_birth: null,
      sex: null,
      cep: '',
      address: null,
      number: null,
      neighborhood: null,
      state: null,
      city: null,
      complement: null
    },
    sexType: [
      {
        text: 'Masculino',
        value: 'MALE'
      },
      {
        text: 'Feminino',
        value: 'FEMALE'
      }
    ]
  }),
  created () {
    this.id = this
      .$route
      .params
      .id

    if (this.id) {
      this.getCustomerById()
    }
  },
  methods: {
    getViaCep () {
      const { cep } = this.customer

      Service
        .getViaCep(cep)
        .then(({ body }) => {
          this.mountStructureViaCep(body)

          if (body.erro) {
            this.returnMessageError({ error: 'CEP não encontrado' })
          }
        })
    },
    mountStructureViaCep (data) {
      const { customer } = this

      customer.neighborhood = data.bairro
      customer.complement = data.complemento
      customer.address = data.logradouro
      customer.state = data.uf
      customer.city = data.localidade
    },
    getCustomerById () {
      Service
        .getCustomerById(this.id)
        .then(({ body }) => {
          this.customer = body
          this.dateFormatted = this.dateFormat(body.date_of_birth)
          this.title = `Editar ${body.name}`
        })
    },
    save () {
      const { id } = this
      const { form } = this.$refs

      if (!form.validate()) {
        return
      }

      this.loading = true

      if (id) {
        return this.edit()
      }

      return this.register()
    },
    edit () {
      const { id, customer } = this

      Service
        .editCustomer(id, customer)
        .then(response => {
          this.messageSuccess('Cliente editado')
        })
        .catch(({ body }) => {
          this.messageError(body.errors)
        })
    },
    register () {
      const { customer } = this

      Service
        .newCustomer(customer)
        .then(response => {
          this.messageSuccess('Cliente registrado')
        })
        .catch(({ errors }) => {
          this.messageError(errors)
        })
    },
    dateFormat (data) {
      if (!data) {
        return ''
      }

      return moment
        .utc(data)
        .format('DD/MM/YYYY')
    },
    parseDate (date) {
      if (!date) {
        return ''
      }

      return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
    },
    datePicker (event) {
      this.dateFormatted = this.dateFormat(event)
      this.menuDatePicker = false
    },
    messageError (data) {
      this.loading = false
      this.returnMessageError(data)
    },
    messageSuccess (message) {
      this.loading = false
      this.returnMessageSuccess(message)
      this.goToList()
    },
    goToList () {
      this
        .$router
        .push('/list')
    }
  },
  watch: {
    'customer.cep' (newValue, oldValue) {
      const edit = this.customer.id && oldValue.length === 0
      if (!edit && newValue.length === 8) {
        this.getViaCep()
      }
    }
  }
}
</script>
