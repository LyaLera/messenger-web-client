  interface ImportMetaEnv extends Readonly<Record<string, string>> {
    readonly VITE_SERVER_MESSENGER: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }