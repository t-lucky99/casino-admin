"use server"

import * as z from "zod";
import { db } from "@/lib/db";
import { GameSchema } from "@/schemas";

export const createGame = async(values: z.infer<typeof GameSchema>) => {
    const validateFields = GameSchema.safeParse(values);
    if(!validateFields.success) {
        return {error: "Invalid fields"}
    }

    const {name, typeId, providerId, releaseDate } = validateFields.data;

    await db.game.create({
        data: {
            name,
            typeId: parseInt(typeId),
            providerId: parseInt(providerId),
            releaseDate,
            createDate: new Date(),
            updateDate: new Date()
        }
    });

    return {success: "Game successfully created!"}
};

