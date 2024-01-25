import { defineConfig } from "vite";

export default defineConfig({
    server: {
        port: 3030,
        open: true
    },
    build: {
        assetsDir: '',
        minify: 'terser',
        terserOptions: {
            compress: {
                passes: 3
            }
        },
        rollupOptions: {
            input: './index.ts',
            output: {
                entryFileNames: 'dragon-lightbox.js'
            }
        }
    }
})