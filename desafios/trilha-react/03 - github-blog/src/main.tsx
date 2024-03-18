import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home'
import { Article } from './pages/article/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/article/:id', element: <Article /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
