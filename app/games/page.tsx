"use client"

import { MainNav } from "@/components/main-nav";
import {GamesForm} from "@/components/games/games-form";
import { fetchGames } from "@/actions/game";
import { useEffect, useState, useTransition } from "react";
import { Game } from "@prisma/client";
import { DataTable } from "@/components/custom-table/data-table";
import {columns} from "./columns";
import { useGameIdStore } from "@/store/zustand";

const GamesPage = () => {
  const { updateGameId } = useGameIdStore();
  const [games, setGames] = useState<Game[]>([]);
  const [isPending, startTransition] = useTransition();
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [gameSelected, setGameSelected] = useState<any>(undefined);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    startTransition(() => {
      fetchGames()
      .then((data) => {
        if(data) {
          setGames(data)
        }
      })
    })

  }, [fetchTrigger]);

  useEffect(() => {
    if (gameSelected && gameSelected.hasOwnProperty("id")) {
      console.log(gameSelected)
    }
  },[gameSelected, open])

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
          <GamesForm 
            onGameAdded={() => setFetchTrigger(prev => prev + 1)} 
            open={open} 
            setOpen={setOpen} 
            game={gameSelected}
          />
        </div>
        <div className="py-5">
          <div>
            <DataTable columns={columns} data={games} customFunction={setGameSelected} setOpen={setOpen} />
          </div>
        </div>
      </div>
    </>
    
  );
};

export default GamesPage;