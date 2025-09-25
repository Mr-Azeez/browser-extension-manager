import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <section id="app">
      <div className="md:px-30 mx-auto pt-10">
        <Navbar />
        <Home />
      </div>
    </section>
  );
};

export default App;
