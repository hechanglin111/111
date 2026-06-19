import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
