<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo"
      autofocus autocomplete="off"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo" />
    </header>
    <section class="main" v-show="todos.length" v-cloak>
      <input class="toggle-all" type="checkbox" v-model="allDone">
      <ul class="todo-list">
        <todo v-for="(todo, index) in filteredTodos"
          :key="todo.id"
          v-on:remove="removeTodo(todo)"
          v-on:check="updateTodo(todo, true)"
          v-on:uncheck="updateTodo(todo, false)"
          v-bind:item="todo">
        </todo>
    </ul>
  </section>
  <footer class="footer" v-show="todos.length" v-cloak>
    <span class="todo-count">
      <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
    </span>
    <ul class="filters">
      <li>
        <a href="#" @click="visibility = 'all'" :class="{ selected: visibility == 'all' }">All</a>
      </li>
      <li>
        <a href="#" @click="visibility = 'active'" :class="{ selected: visibility == 'active' }">Active</a>
      </li>
      <li>
        <a href="#" @click="visibility = 'completed'" :class="{ selected: visibility == 'completed' }">Completed</a>
      </li>
    </ul>
    <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
      Clear completed
    </button>
  </footer>
</section>

</template>

<script>
  import todoStorage from '../helpers/TodoStorage'
  import filters from '../helpers/filters/todoFilter'
  import Todo from './Todo'

  export default {
    name: 'todolist',
    components: {
      Todo
    },
    data () {
      return {
        newTodo: '',
        todos: todoStorage.fetch(),
        editedTodo: null,
        visibility: 'all'
      }
    },

    // watch todos change for localStorage persistence
    watch: {
      todos: {
        handler (todos) {
          todoStorage.save(todos)
        },
        deep: true
      }
    },

    // computed properties
    // http://vuejs.org/guide/computed.html
    computed: {
      filteredTodos () {
        return filters[this.visibility](this.todos)
      },
      remaining () {
        return filters.active(this.todos).length
      },
      allDone: {
        get () {
          return this.remaining === 0
        },
        set (value) {
          this.todos.forEach(function (todo) {
            todo.completed = value
          })
        }
      }
    },

    filters: {
      pluralize (n) {
        return n === 1 ? 'item' : 'items'
      }
    },

    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
      updateTodo (todo, checked) {
        todo.completed = checked
      },
      addTodo (todo) {
        var value = this.newTodo && this.newTodo.trim()
        if (!value) {
          return
        }
        this.todos.push({
          id: todoStorage.uid++,
          title: value,
          completed: false
        })
        this.newTodo = ''
      },
      removeTodo (todo) {
        this.todos.splice(this.todos.indexOf(todo), 1)
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
      },

      removeCompleted () {
        this.todos = filters.active(this.todos)
      }
    }
  }
</script>
