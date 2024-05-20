import { MainNav } from "@/components/main-nav";
import {GamesForm} from "@/components/games/games-form"

const GamesPage = () => {
  return (
    <>
      {/* <div className="container mx-auto md:flex">
        <MainNav />
        <div>
          <div>
            <p>set form search here</p>
            <GamesForm />
          </div>
          <div>set list table here</div>
        </div>
      </div> */}
      <div>
        <div>
          <p>set form search here</p>
          <GamesForm />
        </div>
        <div>set list table here</div>
      </div>
    </>
    
  );
};

export default GamesPage;