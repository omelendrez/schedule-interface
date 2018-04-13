<template>
  <div v-bind:class="{'open':openSuggestion}" class="input-field">
    <b-form-input v-model="mutableSelection" @keydown.native.enter='enter' @keydown.native.down='down' @keydown.native.up='up' @input='change' />
    <ul class="dropdown">
      <div class="dropdown-content" v-show="open">
        <li v-for="(suggestion,index) in matches" v-bind:class="{'active': isActive(index)}" @click="suggestionClick(index)" :key="index">
          <a href="#">{{ suggestion.text }}</a>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import Store from './../../store/store'

export default {
  name: 'Autocomplete',
  data() {
    return {
      open: false,
      current: 0,
      mutableSuggestions: this.suggestions,
      mutableSelection: this.selection
    }
  },
  props: {
    suggestions: {
      type: Array,
      required: true
    },
    selection: {
      type: String,
      required: true,
      twoWay: true
    },
    fieldType: {
      type: String,
      required: true
    }
  },
  computed: {
    matches() {
      return this.mutableSuggestions.filter(str => {
        return str.text.toLowerCase().indexOf(this.mutableSelection) >= 0
      })
    },
    openSuggestion() {
      return (
        this.mutableSelection !== '' &&
        this.matches.length !== 0 &&
        this.open === true
      )
    }
  },
  methods: {
    enter() {
      this.doSelect()
    },
    suggestionClick() {
      this.doSelect()
    },
    up() {
      if (this.current > 0) {
        this.current--
      }
    },
    down() {
      if (this.current < this.matches.length - 1) {
        this.current++
      }
    },
    isActive(index) {
      return index === this.current
    },
    change() {
      if (!this.open) {
        this.open = true
        this.current = 0
      }
    },
    doSelect() {
      const selected = {
        type: this.fieldType,
        selected: this.matches[this.current]
      }
      Store.dispatch('SET_VALUE', selected)
      this.mutableSelection = this.matches[this.current].text
      this.open = false
    }
  }
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  position: absolute;
  background-color: #f1f1f1;
  min-width: 360px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content li {
  list-style-type: none;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}
.active {
  background-color: #ddd;
}
</style>
