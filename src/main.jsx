import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"

import RootLayout from './components/RootLayout/RootLayout'
import RemoveDuplicatesPage from './pages/RemoveDuplicatesPage/RemoveDuplicatesPage'
import CheckPrioritiesPage from './pages/CheckPrioritiesPage/CheckPrioritiesPage'
import './main.scss'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/remove-duplicates" replace />
      },
      {
        path: "/remove-duplicates",
        element: <RemoveDuplicatesPage />
      },
      {
        path: "/check-priorities",
        element: <CheckPrioritiesPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
