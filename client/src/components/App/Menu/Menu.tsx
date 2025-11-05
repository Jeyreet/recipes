import Burger from 'icons/burger.svg'
import Pin from 'icons/pin.svg'
import TopRightArrow from 'icons/top-right-arrow.svg'
import { MouseEventHandler, useState } from 'react'
import ds from './Menu.module.scss'

const Menu = ({ isPinned, toggleIsPinned }: { isPinned: boolean; toggleIsPinned: MouseEventHandler }) => {
  const [isOpened, setIsOpened] = useState(false)

  const toggleIsMenuOpened = () => setIsOpened(prev => !prev)

  return (
    <nav className={ds.menu + ' ' + (isOpened && ds.isOpened) + ' ' + (isPinned && ds.isPinned)}>
      <div className={ds.content}>
        <button className={ds.item} onClick={toggleIsMenuOpened}>
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
        <button className={ds.item} onClick={toggleIsPinned}>
          <Pin className={ds.icon} />
        </button>
      </div>
    </nav>
  )
}

export { Menu }
