import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.unsubscribers = []
    this.storeSub = null

    this.prepare()
  }

  // Setup our component before init
  prepare() { }

  // Initialize component
  // Add DOM listeners
  init() {
    this.initDOMListeners()
  }

  // Notify listeners about event
  // Facade pattern: for using this.emitter from Framework
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Subscibe on event
  $on(event, fn) {
    const unSub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unSub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
  }

  // Return template of component
  toHTML() {
    return ''
  }

  // Destroy component
  // Remove listeners
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
    this.storeSub.unsubscribe()
  }
}