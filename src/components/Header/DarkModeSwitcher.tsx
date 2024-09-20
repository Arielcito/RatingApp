import useColorMode from "@/hooks/useColorMode";
import { useEffect } from "react";

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  useEffect(() => {
    if (typeof setColorMode === "function") {
      setColorMode("dark");
    }
  }, [setColorMode]);
  return (
    <>
      
    </>
  );
};

export default DarkModeSwitcher;
