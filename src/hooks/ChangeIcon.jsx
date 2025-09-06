import { useEffect } from "react";
import lightIcon from "../assets/img/icon-light.svg";
import darkIcon from "../assets/img/icon-dark.svg";

export default function useFaviconTheme() {
  useEffect(() => {
    let favicon = document.querySelector("link[rel*='icon']");

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }

    const updateFavicon = () => {
      const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      favicon.href = darkMode ? lightIcon : darkIcon;
    };

    updateFavicon();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateFavicon);

    return () => mediaQuery.removeEventListener("change", updateFavicon);
  }, []);
}
