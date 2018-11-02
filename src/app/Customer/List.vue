<template lang="html">
  <v-container fluid id="listComponent">
    <v-card>
      <v-toolbar class="elevation-1 py-2" color="grey lighten-4">
        <v-toolbar-title>Lista de clientes</v-toolbar-title>
        <v-icon color="primary" medium class="ml-2"> account_circle </v-icon>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <v-btn
          class="mt-2"
          @click="goToForm()"
          id="botao"
          color="primary"
          right
          absolute
          fab
          slot="activator"
          >
            <v-icon> add </v-icon>
          </v-btn>
          <span>
            Adicionar
          </span>
        </v-tooltip>
      </v-toolbar>
      <v-card-text>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Buscar"
            single-line
            >
          </v-text-field>
        </v-card-title>
        <v-data-table
          id="listTable"
          no-data-text="Nenhum registro encontrado"
          no-results-text="Nenhum resultado encontrado"
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-1 mt-1 table-nowrap"
          :search="search"
          :pagination.sync="pagination"
          :loading="true"
          >
          <v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.name | truncation }}</td>
            <td class="text-xs-center">{{ props.item.date_of_birth | dateFormatBRLocale }}</td>
            <td class="text-xs-center">{{ props.item.sex | sexFormat }}</td>
            <td class="text-xs-center">{{ props.item.cep }}</td>
            <td class="text-xs-center">{{ props.item.address | truncation}}</td>
            <td class="text-xs-center">{{ props.item.complement }}</td>
            <td class="text-xs-center">{{ props.item.neighborhood }}</td>
            <td class="text-xs-center">{{ props.item.number }}</td>
            <td class="text-xs-center">{{ props.item.state }}</td>
            <td class="text-xs-center">{{ props.item.city }}</td>
            <td class="text-xs-center">
              <v-tooltip bottom>
                <v-btn
                  @click="editRow(props.item)"
                  id="editRow"
                  color="blue"
                  flat
                  icon
                  slot="activator"
                  >
                  <v-icon id="editIcon"> edit </v-icon>
                </v-btn>
                <span>
                  Editar
                </span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn
                  @click="deleteRow(props.item)"
                  id="delete"
                  color="error"
                  flat icon
                  slot="activator"
                  >
                  <v-icon id="deleteIcon"> delete </v-icon>
                </v-btn>
                <span>
                  Excluir
                </span>
              </v-tooltip>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
      <div class="text-xs-center py-3">
        <v-pagination
          v-model="pagination.page"
          :total-visible="10"
          :length="pages"
          >
        </v-pagination>
      </div>
    </v-card>
 </v-container>
</template>

<script>
import MessageNotification from '@/mixins/MessageNotification'
import Service from './Service'

export default {
  mixins: [
    MessageNotification
  ],
  data: () => ({
    search: '',
    pagination: {
      rowsPerPage: 5,
      totalItems: null
    },
    items: [],
    headers: [
      { text: 'Nome', value: 'name', align: 'center', sortable: false },
      { text: 'Data de nascimento', value: 'date_of_birth', align: 'center', sortable: false },
      { text: 'Sexo', value: 'sex', align: 'center', sortable: false },
      { text: 'CEP', value: 'cep', align: 'center', sortable: false },
      { text: 'Endereço', value: 'address', align: 'center', sortable: false },
      { text: 'Complemento', value: 'complement', align: 'center', sortable: false },
      { text: 'Bairro', value: 'neighborhood', align: 'center', sortable: false },
      { text: 'Número', value: 'number', align: 'center', sortable: false },
      { text: 'Estado', value: 'state', align: 'center', sortable: false },
      { text: 'Cidade', value: 'city', align: 'center', sortable: false },
      { text: 'Ações', value: 'acoes', align: 'center', sortable: false }
    ]
  }),
  computed: {
    pages () {
      let { rowsPerPage, totalItems } = this.pagination
      if (rowsPerPage == null || totalItems == null) {
        return 0
      }
      return Math.ceil(totalItems / rowsPerPage)
    }
  },
  created () {
    this.getCustomers()
  },
  methods: {
    getCustomers () {
      Service
        .getCustomers()
        .then(({ body }) => {
          this.items = body
          this.pagination.totalItems = this.items.length
        })
    },
    editRow (data) {
      this
        .$router
        .push(`/form/${data.id}`)
    },
    deleteRow (data) {
      const options = {
        title: 'Atenção !!!',
        text: 'Tem certeza que deseja excluir este registro ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3e4094',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar'
      }

      this
        .$swal(options)
        .then((result) => {
          if (result.value) {
            this.deleteCustomer(data.id)
          }
        })
    },
    deleteCustomer (id) {
      Service
        .deleteCustomer(id)
        .then(() => {
          this.getCustomers()
          this.returnMessageSuccess('Cliente removido')
        })
    },
    goToForm () {
      this
        .$router
        .push('/form')
    }
  }
}
</script>

<style media="css">
.table-nowrap {
  white-space: nowrap;
}
</style>
