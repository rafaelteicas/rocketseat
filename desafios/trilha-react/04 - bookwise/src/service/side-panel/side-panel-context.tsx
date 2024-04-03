import { createContext, useState } from 'react'

interface SidePanelProps {
  bookId: string | null
  openSidePanel: (bookId: string) => void
  hideSidePanel: () => void
}

export const SidePanelContext = createContext<SidePanelProps>(
  {} as SidePanelProps,
)

export function SidePanelProvider({ children }: React.PropsWithChildren) {
  const [bookId, setBookId] = useState<string | null>('')

  function openSidePanel(id: string) {
    setBookId(id)
  }

  function hideSidePanel() {
    setBookId(null)
  }

  return (
    <SidePanelContext.Provider value={{ bookId, openSidePanel, hideSidePanel }}>
      {children}
    </SidePanelContext.Provider>
  )
}
