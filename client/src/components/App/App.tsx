import { useUiStore } from 'stores'
import s from './App.module.scss'
import { Content } from './Content'
import { Menu } from './Menu'

const App = () => {
  const { isMenuPinned, isScreenNarrow, closeMenu } = useUiStore()

  return (
    <div
      className={s.app + ' ' + (isMenuPinned && 'menuPinned') + ' ' + (isScreenNarrow && 'narrowScreen')}
      onClick={closeMenu}
    >
      <Menu />
      <Content />
    </div>
  )
}

export { App }
