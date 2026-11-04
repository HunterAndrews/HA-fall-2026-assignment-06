import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({   // https://vitejs.dev/config/
    plugins: [react()],
    server: {   // server configuration for development
        port: 5173,
        proxy: {    // proxy is for backend server and frontend server to communicate with each other
            '/articles': {  // /articles is endpoint for backend server
            target: 'http://localhost:8080',
            changeOrigin: true,
        },
        
        '/health': {    // health is endpoint for backend server and target is backend server url changeOrigin is for allowing cross origin requests
            target: 'http://localhost:8080',
            changeOrigin: true,
        },
    },
    },
})