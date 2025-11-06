import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useUiStore } from 'stores'
import { routes } from '../routes'
import ds from './Content.module.scss'
import { Title } from './Title'

const Content = () => {
  const { isMenuOpened, isMenuPinned } = useUiStore()

  return (
    <div className={ds.centerer} inert={!isMenuPinned && isMenuOpened}>
      <div className={ds.content}>
        <Title />
        <Routes>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export { Content }
