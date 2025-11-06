import { useEffect } from 'react'
import { useUiStore } from 'stores/useUiStore'

const usePageTitle = (pageTitle: string) => {
  const { setPageTitle } = useUiStore()

  useEffect(() => {
    setPageTitle(pageTitle)
  }, [])
}

export { usePageTitle }
