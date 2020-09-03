import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@/core/dom'
import {changeTitle} from '@/redux/actions'
import {defaultTitle} from '@/constants'
import {debounce} from '@/core/utils'
import {ActiveRoute} from '@/core/routes/ActiveRoute'
import {StateProcessor} from '@core/page/StateProcessor'
import {LocalStorageClient} from '@/shared/LocalStorageClient'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })

    this.processor = new StateProcessor(
        new LocalStorageClient(ActiveRoute.param)
    )
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
    <input type="text" class="input" value="${title}">
    <div>

        <div class="button" data-button="remove">
            <i class="material-icons" data-button="remove">delete</i>
        </div>
    
        <div class="button" data-button="exit">
            <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>
    
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  async onClick(event) {
    const $target = $(event.target)

    if ($target.data.button === 'remove') {
      const decision = confirm('Are you sure you want to remove current table?')
      if (decision) {
        await this.processor.remove()
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}