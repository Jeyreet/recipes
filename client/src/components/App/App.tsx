import { useState } from 'react'
import s from './App.module.scss'
import { Content } from './Content'
import { Menu } from './Menu'

const App = () => {
  const [isMenuPinned, setIsMenuPinned] = useState(false)

  const toggleIsMenuPinned = () => setIsMenuPinned(prev => !prev)

  return (
    <div className={s.app + ' ' + (isMenuPinned && s.menuPinned)}>
      <Menu isPinned={isMenuPinned} toggleIsPinned={toggleIsMenuPinned} />
      <Content isMenuPinned={isMenuPinned} />
    </div>
  )
}

export { App }
