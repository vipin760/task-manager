import { useEffect } from 'react'
import './App.css'
import HomePage from './pages/Home/HomePage'
import AOS from 'aos'
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <>
      <HomePage/>
    </>
  )
}

export default App
