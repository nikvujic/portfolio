/// <reference types="vite/client" />

interface Document {
  startViewTransition?: (callback: () => void | Promise<void>) => { ready: Promise<void>; finished: Promise<void> };
}
