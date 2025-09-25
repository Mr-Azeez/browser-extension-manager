import { useTheme } from "@/context/ThemeProvider";
import { Button } from "./ui/button";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <section id="nav-bar">
      <div className="flex justify-between items-center bg-div-background p-2 rounded-2xl mb-10">
        <div>
          <img src="images/logo.svg" alt="App logo" className="text-[#fff]"/>
        </div>
        {theme === "light" ? (
          <Button
            className="bg-[#ededed] rounded-xl cursor-pointer hover:bg-[#c7c7c7] px-3 py-5.5 focus:ring-2 ring-[#c7221a] ring-offset-1"
            onClick={() => setTheme("dark")}
          >
            <img src="images/icon-moon.svg" alt="moon icon" />
          </Button>
        ) : (
          <Button
            className="bg-[#545969] rounded-xl cursor-pointer hover:bg-[#c7c7c7] px-3 py-5.5 focus:ring-2 ring-[#c7221a] ring-offset-1"
            onClick={() => setTheme("light")}
          >
            <img src="images/icon-sun.svg" alt="sun icon" />
          </Button>
        )}
      </div>
    </section>
  );
};

export default Navbar;
