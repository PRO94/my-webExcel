export class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }

    this.listeners[event].forEach(listener => {
      listener(...args)
    })

    return true
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)

    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

// Example
// for testing Observer in this file need to remove 'export' in this class

// const emitter = new Emitter()

// const unSub = emitter.subscribe('test', data => console.log('Sub: ', data))
// emitter.emit('test', 'Hello immediately')

// setTimeout(() => {
//   emitter.emit('test', 'Hello after 2 sec')
// }, 2000);

// setTimeout(() => {
//   unSub() // unsubscription
// }, 3000);

// setTimeout(() => {
//   emitter.emit('test', 'Hello after 4 sec')
// }, 4000);