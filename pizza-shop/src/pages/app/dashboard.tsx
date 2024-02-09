import { Helmet } from 'react-helmet-async'

export function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet />
      <h1>Dashboard</h1>
    </div>
  )
}
