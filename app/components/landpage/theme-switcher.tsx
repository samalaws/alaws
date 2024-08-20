"use client"
import {
    MoonIcon,
    SunIcon,
  } from "lucide-react";
  import { useTheme } from "next-themes";
  import { useMounted } from "nextra/hooks";


export default function ThemeSwitcher() {
  const { setTheme, resolvedTheme  } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";

  const toogleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <>
      <span
      role="button"
      aria-label="Toggle Dark Mode"
      className="nx-cursor-pointer nx-p-2 nx-text-current"
      tabIndex={0}
      onClick={toogleTheme}
      onKeyDown={e => {
        if (e.key === 'Enter') toogleTheme()
      }}
    >
      {mounted && isDark ? <MoonIcon /> : <SunIcon />}
    </span>
    </>
  );
}