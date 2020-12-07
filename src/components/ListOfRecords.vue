<template>
  <b-container fluid>
     <b-card-group deck>
      <div v-bind:key="record.id" v-for="(record, i) in this.records">
        <record v-bind:record="record" v-bind:position="i" v-on="$listeners"> </record>
      </div>
     </b-card-group>
  </b-container>
</template>

<script>
import Record from '../components/Record.vue'

export default {
  name: 'ListOfRecords',
  props: ["records"],
  components: {
    Record
  }
}
</script>

<style scoped>
  
</style>