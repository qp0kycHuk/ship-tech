import showPass from './show-pass'
import theme from './theme'
import fancybox from './fancybox'
import phonemask from './phonemask/phonemask'
import scrollTo from './scrollTo'
import tab from 'npm-kit-tab'
import toggle from 'npm-kit-toggle'
import ripple from '@qpokychuk/ripple'
import swiper from './swiper'
import ymaps from './ymaps'
import animations from './animations'

import '../scss/index.scss'

window.addEventListener('DOMContentLoaded', () => loadHandler())

function loadHandler() {
  showPass.init()
  scrollTo.init()
  tab.init()
  toggle.init()
  ripple.init()
  theme.init()
  fancybox.init()
  phonemask.init('[type="tel"]')

  ripple.attach('.btn')
  ripple.attach('.waved')
  ripple.deAttach('.btn-text')

  swiper.init()
  ymaps.init()
  animations.init()

  scrollHandler()
}

window.addEventListener('scroll', scrollHandler)

function scrollHandler() {
  document.body.classList.toggle('scroll-top', window.scrollY == 0)
}

//  script for copy code



(() => {
  const timeOuts = new Map()

  document.addEventListener('click', (event) => {
    const copyButton = (event.target as HTMLElement)?.closest('[data-copy]')

    if (!copyButton) return

    copyTextToClipboard(copyButton.getAttribute('data-copy') || '')

    copyButton.classList.add('active')

    if (timeOuts.has(copyButton)) {
      clearTimeout(timeOuts.get(copyButton))
    }

    timeOuts.set(
      copyButton,
      setTimeout(() => {
        copyButton.classList.remove('active')
      }, 2000)
    )
  })

  function fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement('textarea')

    textArea.value = text

    // Avoid scrolling to bottom
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand('copy')
      const msg = successful ? 'successful' : 'unsuccessful'

      console.log('Fallback: Copying text command was ' + msg)
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err)
    }

    document.body.removeChild(textArea)
  }

  function copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text)

      return
    }

    navigator.clipboard.writeText(text).then(
      function () {
        console.log('Async: Copying to clipboard was successful!')
      },
      function (err) {
        console.error('Async: Could not copy text: ', err)
      }
    )
  }
})()
