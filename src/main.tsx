import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import "@radix-ui/themes/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <ScrollArea>
        <App />
      </ScrollArea>
  </React.StrictMode>
);
