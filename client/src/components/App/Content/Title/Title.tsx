import { useUiStore } from 'stores/useUiStore'
import ds from './Title.module.scss'

const Title = () => {
  const { pageTitle } = useUiStore()

  return (
    <div className={ds.centerer}>
      <h2 className={ds.title}>{pageTitle}</h2>
      <div className={ds.blur}></div>
    </div>
  )
}

export { Title }
