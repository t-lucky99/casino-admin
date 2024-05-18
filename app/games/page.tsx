import { Header } from "@/components/page-header";
import { MainNav } from "@/components/main-nav";

const GamesPage = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto md:flex">
        <MainNav />
        <div>content</div>
      </div>
    </>
    
  );
};

export default GamesPage;