/// <reference types="vite/client" />
import 'vue-router'

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_CLIENT_ID: string
  readonly VITE_RESPONSE_TYPE: string
  readonly VITE_SCOPE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
