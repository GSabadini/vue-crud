export default {
  data: () => ({
    notificationSystem: {
      options: {
        error: {
          position: 'topRight'
        },
        success: {
          position: 'topRight'
        }
      }
    }
  }),
  methods: {
    returnMessageSuccess (message) {
      const { options } = this.notificationSystem
      this.$toast.success(message, 'Sucesso!', options.success)
    },
    returnMessageError (errors) {
      const keys = Object.keys(errors)
      const { options } = this.notificationSystem

      keys.forEach(key => {
        const errorArray = errors[key]
        this.$toast.error(errorArray, 'Erro!', options.error)
      })
    }
  }
}
