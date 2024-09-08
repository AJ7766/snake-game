import { MediatoolThemeProvider } from '@northlight/ui'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from '../src/app'
import { UserProvider } from '../context/UserContext'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <MediatoolThemeProvider>
        <UserProvider>
            <App />
        </UserProvider>
    </MediatoolThemeProvider>
)
