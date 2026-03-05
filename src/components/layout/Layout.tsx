import { Outlet } from 'react-router-dom'
import GNB from './GNB'

/**
 * Layout wraps all pages that have the Global Navigation Bar.
 * <Outlet /> is where React Router renders the current page's content.
 */
function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <GNB />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
