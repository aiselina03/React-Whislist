import { useEffect } from "react";
import useLocalStorage from "./local";
import "./style.scss"

function useDarkMode() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    }
  }, [theme]);

  function handleTheme() {
    if (document.body.classList.contains("dark")) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
    document.body.classList.toggle("dark");
  }
  return {theme, handleTheme};
}

export default useDarkMode;

