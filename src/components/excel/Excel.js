import {$} from '@core/dom'
import {Emitter} from '../../core/Emitter'
import {StoreSubscriber} from '../../core/StoreSubscriber'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emitter()
    this.subsciber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excell')

    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.subsciber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.subsciber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}