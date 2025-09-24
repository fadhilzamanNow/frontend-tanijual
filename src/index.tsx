import {createRoot} from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import "./index.css"


const router = createRouter({routeTree})

declare module '@tanstack/react-router' {
  interface Register {
    router : typeof router
  }
}

createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <RouterProvider router={router}>
  </RouterProvider>
)



