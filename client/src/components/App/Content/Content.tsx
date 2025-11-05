import { useUiStore } from 'stores'
import ds from './Content.module.scss'

const Content = () => {
  const { isMenuPinned } = useUiStore()

  return (
    <div className={ds.centerer + ' ' + (isMenuPinned && ds.menuPinned)}>
      <div className={ds.content}>CONTENT</div>
    </div>
  )
}

export { Content }
