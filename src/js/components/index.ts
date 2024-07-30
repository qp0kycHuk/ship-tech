import counter from './counter'
import icon from './icon'
import menu from './menu/menu'
import menuButton from './menu/menuButton'
import menuItem from './menu/menuItem'
import menuItems from './menu/menuItems'

function registerAll() {
  counter.register()
  icon.register()
  menu.register()
  menuItems.register()
  menuButton.register()
  menuItem.register()
}

registerAll()
