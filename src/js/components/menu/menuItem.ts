// import { twMerge } from 'tailwind-merge'

import { MenuChild } from './menu'

export class MenuItem extends MenuChild {
  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()

    this.addEventListener('click', this.clickHandler)
  }

  clickHandler() {
    this.menu?.toggle()
  }
}

function register() {
  customElements.define('c-menu-item', MenuItem)
}

export default { register }
