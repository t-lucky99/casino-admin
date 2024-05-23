import { db } from "@/lib/db";

export const getAllGames = async() => {
    try {
        const games = await db.game.findMany();
        return games;
    } catch(e) {
        console.log(e)
        return null;
    }
};