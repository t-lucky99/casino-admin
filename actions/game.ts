"use server"

import * as z from "zod";
import { db } from "@/lib/db";
import { GameSchema } from "@/schemas";

export const fetchGames = async() => {
    try {
        const games = await db.game.findMany({
            include: {
                type: {
                    select: {
                        name: true // Include the 'name' field from the 'type' table
                    }
                },
                provider: {
                    select: {
                        name: true
                    }
                }
              },
        });

        const gamesWithAlias = games.map(game => ({
            ...game,
            typeName: game.type?.name, // Assign the 'name' field to 'typeName' alias
            providerName: game.provider?.name // Assign the 'name' field to 'providerName' alias
        }));

        console.log(gamesWithAlias)
        return gamesWithAlias;
    } catch(e) {
        console.log(e);
        return null;
    }
};

export const fetchTypes = async() => {
    try {
        const types = await db.type.findMany();
        return types;
    } catch(e) {
        console.log(e);
        return null;
    }
};

export const fetchProviders = async() => {
    try {
        const providers = await db.provider.findMany();
        return providers;
    } catch(e) {
        console.log(e);
        return null;
    }
};


export const createGame = async(values: z.infer<typeof GameSchema>) => {
    const validateFields = GameSchema.safeParse(values);
    if(!validateFields.success) {
        return {error: "Invalid fields"}
    }

    const {name, typeId, providerId, releaseDate, image } = validateFields.data;

    await db.game.create({
        data: {
            name,
            image,
            typeId: parseInt(typeId),
            providerId: parseInt(providerId),
            releaseDate,
            createDate: new Date(),
            updateDate: new Date()
        }
    });

    return {success: "Game successfully created!"}
};


