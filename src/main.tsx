// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { TaskProvider } from './context/TaskProvider.tsx'
import './index.css'
import { ThemeProvider } from './context/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>

  <ThemeProvider>
    <TaskProvider>
      <App />
    </TaskProvider>
  </ThemeProvider>

  // </StrictMode>,
)
