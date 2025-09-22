import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./index.css";
import AppRouter from "./routes/index.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <MantineProvider>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        {/* <Notifications position="bottom-right" zIndex={9999999} /> */}
        <AppRouter />
      </StrictMode>
    </QueryClientProvider>
  </MantineProvider>
);
