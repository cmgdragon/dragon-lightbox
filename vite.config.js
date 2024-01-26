import { defineConfig } from "vite";

export default defineConfig({
    server: {
        port: 3030,
        open: true
    },
    build: {
        assetsDir: '',
        minify: 'terser',
        lib: {
            entry: './index.ts',
            name: 'dragonLightbox'
        },
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