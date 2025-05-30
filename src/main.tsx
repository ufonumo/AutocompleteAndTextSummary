import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MantineProvider } from "@mantine/core"
import { BrowserRouter } from "react-router-dom"
import { Notifications } from "@mantine/notifications"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <MantineProvider>
                    <Notifications />
                    <App />
                </MantineProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
)
