import Vue from 'vue'

const uri = 'customers'
class CustomerService {
  getCustomers () {
    return Vue
      .http
      .get(uri)
  }

  getCustomerById (id) {
    return Vue
      .http
      .get(`${uri}/${id}`)
  }

  newCustomer (payload) {
    return Vue
      .http
      .post(uri, payload)
  }

  editCustomer (id, payload) {
    return Vue
      .http
      .put(`${uri}/${id}`, payload)
  }

  deleteCustomer (id) {
    return Vue
      .http
      .delete(`${uri}/${id}`)
  }

  getViaCep (cep) {
    return Vue
      .http
      .get(`https://viacep.com.br/ws/${cep}/json`)
  }
}

const customerService = new CustomerService()
export default customerService
