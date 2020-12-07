<template>
  <div>
    <b-modal id="recordModal" :title="this.isAdd ? 'Add' : 'Update' + ' A-Record!'" 
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk">
      <b-form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="state.name"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            :state="state.name"
            :disabled="!this.isAdd"
            id="name-input"
            v-model="form.name"
            required
            placeholder="enter name of record"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="state.valuesStr"
          label="Values(comma-separated)"
          label-for="name-input"
          invalid-feedback="At least one value is required"
        >
          <b-form-input
            :state="state.valuesStr"
            id="valueStr-input"
            v-model="form.valuesStr"
            required
            placeholder="0.0.0.0,69.44.3.2"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { addARecord, updateARecord } from '../api'

export default {
  name: "AddModal",
  props: ["isAdd", "inputName"],
  data() {
    return {
      form: {
        name: '',
        valuesStr: ''
      },
      state: {
        name: null,
        valuesStr: null
      }
    }
  },
  methods: {
    checkFormValidity() {
      this.state.name = this.$refs.form['name-input'].checkValidity()
      this.state.valuesStr = this.$refs.form['valueStr-input'].checkValidity()
      return this.state.name && this.state.valuesStr
    },

    resetModal() {
      this.form.name = ''
      this.form.valuesStr = ''

      this.state.name = null
      this.state.valuesStr = null
    },

    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
        // Trigger submit handler
      this.handleSubmit()
    },

    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      
      const values = this.form.valuesStr.split(',').map(value => value.trim())
      if(this.isAdd === true){
        addARecord({
          name: this.form.name,
          values: values
        }, (res, err) => {
          this.$emit("record_event", res, err)
        })
      }else {
        updateARecord({
          name: this.form.name,
          values: values
        }, (res, err) => {
          this.$emit("record_event", res, err)
        })
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('recordModal')
      })
    }
  },
  watch: {
    inputName: function (newVal) {
      this.form.name = newVal
    }
  }
}
</script>

<style>

</style>