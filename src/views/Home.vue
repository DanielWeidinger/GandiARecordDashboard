<template>
  <div>
    <b-alert 
      dismissible
      fade
      :show="showAlert">
      {{alertMsg}}
    </b-alert>
    <list-of-records v-on:edit-record="showUpdateRecord" v-on:record_event="setAlert"
    v-bind:records="this.records">
    </list-of-records>
    <fab :actions="fabActions"
          @showAddRecord="showAddRecord"></fab>
    <record-modal v-on:record_event="setAlert" :isAdd="this.isAdd" :inputName="this.editName"></record-modal>
  </div>
</template>

<script>
import ListOfRecords from '../components/ListOfRecords.vue'
import Fab from 'vue-fab'
import RecordModal from '../components/RecordModal'
import { v4 as uuid } from 'uuid'
import { getAllARecords } from '../api'
import { createHref } from '../config'

export default {
  name: 'Home',
  components: {
    ListOfRecords,
    Fab,
    RecordModal
  },
  data(){
    return {
      isAdd: true,
      editName: null,
      records: [],
      fabActions: [
        {
          name: 'showAddRecord',
          tooltip: 'add record',
          icon: "add"
        }
      ],
      showAlert: false,
      alertMsg: 'I vertrog kanne bischgottn'
    }
  },
  created() {
    getAllARecords((res) => {
      console.log("Got " + res.data.length + " entries")
      res.data.forEach(rawRec => {
        const record = {
          id: uuid(),
          name: rawRec['rrset_name'],
          values: rawRec['rrset_values'],
          details: rawRec['rrset_href'],
          href: createHref(rawRec['rrset_name'])
        }
        this.records.push(record)
      });
    })
  },
  methods: {
    showAddRecord() {
      this.isAdd = true
      this.editName = null
      this.$bvModal.show("recordModal")
    },
    showUpdateRecord(record) {
      this.isAdd = false
      this.editName = record.name
      this.$bvModal.show("recordModal")
    },
    setAlert(res, err) {

      if(err){
        this.alertMsg = err.message
      }else{
        this.alertMsg = res.data.message
      }
      return this.showAlert = true
    }
  }
}
</script>
