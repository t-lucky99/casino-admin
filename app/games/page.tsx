"use client"

import { MainNav } from "@/components/main-nav";
import {GamesForm} from "@/components/games/games-form";
import { fetchGames } from "@/actions/game";
import { useEffect, useState, useTransition } from "react";
import { Game } from "@prisma/client";



const GamesPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      fetchGames()
      .then((data) => {
        console.log("data:::", data)
        if(data) {
          setGames(data)
        }
      })
    })
  }, []);

  const list = games?.map((item) => {
    return (
      <>
        <p key={item.id}>{item?.name}</p>
      </>
    )
  })

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
        <div>
          <p>set list table here</p>
          <div>
            {list}
          </div>
          
        </div>
      </div>
    </>
    
  );
};

export default GamesPage;