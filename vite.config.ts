import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as dotenv from 'dotenv'

// https://vitejs.dev/config/

export default ({}) => {
  dotenv.config()
  return defineConfig({
    plugins: [vue({
      reactivityTransform: true,
    })],
  })
}

// export default defineConfig({
//   plugins: [vue({
//     reactivityTransform: true,
//   })],
// })
