<template>
  <b-card class="mt-3" no-body
    :bg-variant="this.position % 4 != 0 ? 'light' : 'secondary'"
    >
    <b-card-body :title="this.record.name">
      <div v-bind:key="value" v-for="value in this.record.values">
        <b-card-text>
          {{value}}
        </b-card-text>
      </div>
    </b-card-body>
    
    <b-card-footer>
      <b-button :href="this.record.href" target="_blank" pill variant="outline-success">Open</b-button>
      <b-button @click="edit_event" pill variant="outline-primary">Edit</b-button>
      <b-button @click="delete_event" pill variant="outline-danger">Delete</b-button>
    </b-card-footer>
  </b-card>  
</template>

<script>
import { deleteARecord } from '../api'

export default {
  name: "Record",
  components: {
  },
  props: ["record", "position"],
  methods: {
    edit_event(){
      this.$emit("edit-record", this.record)
    },
    delete_event() {
      deleteARecord({
          name: this.record.name
        }, (res, err) => {
          console.log(res)
          if(res !== null){
            res.data = {}
            res.data.message = "Deleted " + this.record.name + " successfully"
          }
            
          this.$emit("record_event", res, err)
      })
    }
  }
}
</script>

<style>
</style>