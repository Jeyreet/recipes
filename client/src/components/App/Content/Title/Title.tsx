import { useUiStore } from 'stores'
import ds from './Title.module.scss'

const Title = () => {
  const { titleText } = useUiStore()

  return (
    <div className={ds.centerer}>
      <h2 className={ds.title}>{titleText}</h2>
      <div className={ds.blur}></div>
    </div>
  )
}

export { Title }
