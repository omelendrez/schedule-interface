<template>
  <div>
    <b-table :items="positionRows" :fields="fields" head-variant="light" hover @click.native="selectPosition($event)">
      <template slot="color" slot-scope="data">
        <div v-html="data.item.color"></div>
      </template>
      <template slot="sector_position" slot-scope="data">
        {{data.item.sector_position}}
      </template>
      <template slot="hours" slot-scope="data">
        {{data.item.hours}}
      </template>
    </b-table>
    <hr />
    <div>
      <div class="delete-sector" @click="deleteSector"></div>
      <div class="in-line">Borrar actividad</div>
    </div>
    <div>
      <div class="de-activate" @click="deActivate"></div>
      <div class="in-line">Desactivar click</div>
    </div>
  </div>
</template>

<script>
import Store from '@/store/store'
const fields = require('@/utils/fields.json').positions

export default {
  name: 'Positions',
  Store,
  props: {
    selectPosition: {
      type: Function,
      default: undefined
    },
    deleteSector: {
      type: Function,
      default: undefined
    },
    deActivate: {
      type: Function,
      default: undefined
    },
    positionRows: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      fields: fields
    }
  }
}
</script>
<style>
.position-color {
  width: 21px;
  border-radius: 4px;
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #ccc;
}
.in-line {
  height: 30px;
  display: inline-block;
  margin-left: 14px;
  vertical-align: middle;
}
.delete-sector {
  display: inline-block;
  width: 21px;
  height: 21px;
  border-radius: 4px;
  margin-left: 14px;
  cursor: pointer;
  border: 1px solid red;
}
.de-activate {
  display: inline-block;
  width: 21px;
  height: 21px;
  border-radius: 4px;
  margin-left: 14px;
  cursor: pointer;
  border: 1px solid #ccc;
}
</style>
