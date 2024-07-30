import ymaps from 'ymaps'

let mapInited = false

function init() {
  window.addEventListener('scroll', mapsInit, { once: true })
  document.addEventListener('click', mapsInit, { once: true })
  setTimeout(mapsInit, 2000)
}

function mapsInit() {
  if (mapInited) return
  mapInited = true

  if (document.getElementById('contact-map')) {
    ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then((maps: any) => {
      const coords = window.maplocation
      // const center = [coords[0], coords[1]]

      const options = {
        center: coords,
        zoom: 17,
      }

      const map = new maps.Map('contact-map', options)
      const sizeImage = [74, 85]

      const placemark = new maps.Placemark(
        coords,
        {},
        {
          iconLayout: 'default#image',
          iconImageHref: '/img/map-point.svg',
          iconImageSize: sizeImage,
          iconImageOffset: [-1 * (sizeImage[0] / 2), -1 * sizeImage[1]],
          hasBalloon: true,
          openBalloonOnClick: true,
          hideIconOnBalloonOpen: false,
        }
      )

      map.controls.remove('geolocationControl')
      map.controls.remove('searchControl')
      map.controls.remove('trafficControl')
      map.controls.remove('typeSelector')
      map.controls.remove('fullscreenControl')
      // map.controls.remove('zoomControl')
      map.controls.remove('rulerControl')
      map.behaviors.disable(['scrollZoom'])
      map.geoObjects.add(placemark)
    })
  }
}

export default { init }

interface CustomWindow extends Window {
  maplocation: [number, number]
}

declare let window: CustomWindow
