import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UiState = {
  isMenuOpened: boolean
  isMenuPinned: boolean

  openMenu: () => void
  closeMenu: () => void
  toggleMenuOpened: () => void
  toggleMenuPinned: () => void
}

const useUiStore = create<UiState>()(
  persist(
    set => ({
      isMenuPinned: false,
      isMenuOpened: false,

      openMenu: () => set({ isMenuOpened: true }),
      closeMenu: () => set(s => ({ isMenuOpened: s.isMenuPinned })),
      toggleMenuOpened: () => set(s => ({ isMenuOpened: s.isMenuPinned ? true : !s.isMenuOpened })),

      pinMenu: () => set(s => ({ isMenuPinned: s.isMenuOpened })),
      unpinMenu: () => set({ isMenuPinned: false }),
      toggleMenuPinned: () => set(s => ({ isMenuPinned: s.isMenuOpened ? !s.isMenuPinned : false })),
    }),
    {
      name: 'ui-store',
      partialize: s => ({
        isMenuPinned: s.isMenuPinned,
      }),
    },
  ),
)

useUiStore.setState(s => ({ isMenuOpened: s.isMenuPinned }))

export { useUiStore }
