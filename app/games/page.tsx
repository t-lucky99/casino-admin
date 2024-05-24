"use client"

import { MainNav } from "@/components/main-nav";
import {GamesForm} from "@/components/games/games-form";
import { fetchGames } from "@/actions/game";
import { useEffect, useState, useTransition } from "react";
import { Game } from "@prisma/client";
import { DataTable } from "@/components/custom-table/data-table";
import {columns} from "./columns";



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
      <div className="container mx-auto py-0">
        <div className="py-5">
          <GamesForm />
        </div>
        <div className="py-5">
          <div>
            <DataTable columns={columns} data={games} />
          </div>
          
        </div>
      </div>
    </>
    
  );
};

export default GamesPage;