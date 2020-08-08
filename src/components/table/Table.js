import {ExcelComponent} from '@core/ExcelComponent'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  toHTML() {
    return `
      <div class="row">
        <div class="row-info"></div>
        <div class="row-data">
            <div class="column">A</div>
            <div class="column">B</div>
            <div class="column">C</div>
        </div>
      </div>
      <div class="row">
          <div class="row-info">1</div>
          <div class="row-data">
              <div class="cell" contenteditable>A111</div>
              <div class="cell" contenteditable>B111</div>
              <div class="cell" contenteditable>C111</div>
          </div>
      </div>
      <div class="row">
          <div class="row-info">2</div>
          <div class="row-data">
              <div class="cell" contenteditable>A222</div>
              <div class="cell" contenteditable>B222</div>
              <div class="cell" contenteditable>C222</div>
          </div>
      </div>
    `
  }
}