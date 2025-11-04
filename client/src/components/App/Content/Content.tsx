import ds from './Content.module.scss'

const Content = ({ isMenuPinned }: { isMenuPinned: boolean }) => {
  return (
    <div className={ds.centerer + ' ' + (isMenuPinned && ds.menuPinned)}>
      <div className={ds.content}>CONTENT</div>
    </div>
  )
}

export { Content }
