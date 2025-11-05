import Burger from 'icons/burger.svg'
import Pin from 'icons/pin.svg'
import TopRightArrow from 'icons/top-right-arrow.svg'
import { useUiStore } from 'stores'
import ds from './Menu.module.scss'

const Menu = () => {
  const { isMenuOpened, isMenuPinned, toggleMenuOpened, toggleMenuPinned } = useUiStore()

  return (
    <nav className={ds.menu + ' ' + (isMenuOpened && ds.opened) + ' ' + (isMenuPinned && ds.pinned)}>
      <div className={ds.content}>
        <button className={ds.item} onClick={toggleMenuOpened}>
          <Burger className={ds.icon} />
        </button>
        <div className={ds.logo}>Jeyreet Recipes App</div>
        <ul className={ds.list}>
          <li className={ds.contents}>
            <a className={ds.item} href="#">
              <TopRightArrow className={ds.icon} />
              <div className={ds.label}>Ссылка на страницу</div>
            </a>
          </li>
          <li className={ds.contents}>
            <a className={ds.item} href="#">
              <TopRightArrow className={ds.icon} />
              <div className={ds.label}>Ссылка на страницу</div>
            </a>
          </li>
          <li className={ds.contents}>
            <a className={ds.item} href="#">
              <TopRightArrow className={ds.icon} />
              <div className={ds.label}>Ссылка на страницу</div>
            </a>
          </li>
          <li className={ds.contents}>
            <a className={ds.item} href="#">
              <TopRightArrow className={ds.icon} />
              <div className={ds.label}>Ссылка на страницу</div>
            </a>
          </li>
          <li className={ds.contents}>
            <a className={ds.item} href="#">
              <TopRightArrow className={ds.icon} />
              <div className={ds.label}>Ссылка на страницу</div>
            </a>
          </li>
        </ul>
        <button className={ds.item} onClick={toggleMenuPinned}>
          <Pin className={ds.icon} />
        </button>
      </div>
    </nav>
  )
}

export { Menu }
