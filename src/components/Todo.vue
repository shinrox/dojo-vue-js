<template>
  <li class="todo"
    :key="todo.id"
    :class="{ completed: todo.completed, editing: todo == editedTodo }">
    <div class="view">
      <input class="toggle" type="checkbox" v-model="todo.completed" @click="updateTodo(todo.completed)">
      <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
      <button class="destroy" @click="$emit('remove')"></button>
    </div>
    <input class="edit" type="text"
    v-model="todo.title"
    @blur="doneEdit(todo)"
    @keyup.enter="doneEdit(todo)"
    @keyup.esc="cancelEdit(todo)">
  </li>
</template>

<script>
  export default {
    name: 'todo',
    props: ['item'],
    data () {
      return {
        todo: this.item,
        editedTodo: null
      }
    },
    methods: {
      updateTodo (checked) {
        console.log('update', checked)
        this.$emit(checked ? 'check' : 'uncheck')
      },
      editTodo (todo) {
        this.beforeEditCache = todo.title
        this.editedTodo = todo
      },

      doneEdit (todo) {
        if (!this.editedTodo) {
          return
        }
        this.editedTodo = null
        todo.title = todo.title.trim()
        if (!todo.title) {
          this.removeTodo(todo)
        }
      },

      cancelEdit (todo) {
        this.editedTodo = null
        todo.title = this.beforeEditCache
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
