import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const narrowScreenMediaQuery = window.matchMedia('(max-width: 767px)')

type UiState = {
  isScreenNarrow: boolean

  isMenuOpened: boolean
  isMenuPinned: boolean
  wasMenuPinned: boolean

  titleText: string

  openMenu: () => void
  closeMenu: () => void
  toggleMenuOpened: () => void
  toggleMenuPinned: () => void

  setTitleText: (text: string) => void
}

const useUiStore = create<UiState>()(
  persist(
    set => ({
      isScreenNarrow: narrowScreenMediaQuery.matches,

      isMenuOpened: false,
      isMenuPinned: false,
      wasMenuPinned: false,

      titleText: 'Загрузка...',

      openMenu: () => set({ isMenuOpened: true }),
      closeMenu: () => set(s => ({ isMenuOpened: s.isMenuPinned })),
      toggleMenuOpened: () => set(s => ({ isMenuOpened: s.isMenuPinned ? true : !s.isMenuOpened })),

      pinMenu: () => set(s => ({ isMenuPinned: s.isMenuOpened, wasMenuPinned: s.isMenuOpened })),
      unpinMenu: () => set({ isMenuPinned: false, wasMenuPinned: false }),
      toggleMenuPinned: () => set(s => ({ isMenuPinned: s.isMenuOpened ? !s.isMenuPinned : false })),

      setTitleText: text => set({ titleText: text }),
    }),
    {
      name: 'ui-store',
      partialize: s => ({
        isMenuPinned: s.isMenuPinned,
      }),
    },
  ),
)

useUiStore.setState(s => ({ isMenuOpened: s.isMenuPinned, wasMenuOpened: s.isMenuPinned }))

narrowScreenMediaQuery.addEventListener('change', e => {
  if (e.matches)
    useUiStore.setState(s => ({
      isScreenNarrow: true,

      isMenuOpened: s.isMenuOpened && !s.isMenuPinned,
      isMenuPinned: false,
      wasMenuPinned: s.isMenuPinned,
    }))
  else
    useUiStore.setState(s => ({
      isScreenNarrow: false,

      isMenuOpened: s.wasMenuPinned || s.isMenuOpened,
      isMenuPinned: s.wasMenuPinned,
    }))
})

export { useUiStore }
