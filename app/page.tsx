import { Navbar } from "./_components/navbar";
import { Content } from "./_components/content";

const HomePage = () => {
  return (
    <div className="max-w-screen min-h-screen flex flex-col">
      <Navbar />
      <Content />
    </div>
  )
}

export default HomePage;