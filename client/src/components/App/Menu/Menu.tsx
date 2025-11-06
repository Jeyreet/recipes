import Burger from 'images/icons/burger.svg'
import Pin from 'images/icons/pin.svg'
import TopRightArrow from 'images/icons/top-right-arrow.svg'
import { Link } from 'react-router-dom'
import { useUiStore } from 'stores/useUiStore'
import { routes } from '../routes'
import ds from './Menu.module.scss'

const Menu = () => {
  const { isMenuOpened, isMenuPinned, closeMenu, toggleMenuOpened, toggleMenuPinned } = useUiStore()

  return (
    <nav className={ds.menu + ' ' + (isMenuOpened && ds.opened)} onClick={e => e.stopPropagation()}>
      <div className={ds.content}>
        <button
          className={ds.item}
          onClick={toggleMenuOpened}
          inert={isMenuPinned}
          aria-label={isMenuOpened ? 'Close menu' : 'Open menu'}
        >
          <Burger className={ds.icon} />
        </button>
        <div className={ds.logo}>Jeyreet Recipes App</div>
        <ul className={ds.list}>
          {routes.map(({ path, label }) => (
            <li key={path} className={ds.contents}>
              <Link className={ds.item} to={path} inert={!isMenuOpened} onClick={closeMenu}>
                <TopRightArrow className={ds.icon} />
                <div className={ds.label}>{label}</div>
              </Link>
            </li>
          ))}
        </ul>
        <button
          className={ds.item}
          onClick={toggleMenuPinned}
          inert={!isMenuOpened}
          aria-label={isMenuPinned ? 'Unpin menu' : 'Pin menu'}
        >
          <Pin className={ds.icon} />
        </button>
      </div>
    </nav>
  )
}

export { Menu }
