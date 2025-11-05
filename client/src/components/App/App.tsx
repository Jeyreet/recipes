import { useUiStore } from 'stores'
import s from './App.module.scss'
import { Content } from './Content'
import { Menu } from './Menu'

const App = () => {
  const { isMenuPinned } = useUiStore()

  return (
    <div className={s.app + ' ' + (isMenuPinned && s.menuPinned)}>
      <Menu />
      <Content />
    </div>
  )
}

export { App }
