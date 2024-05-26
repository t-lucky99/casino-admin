import { create } from 'zustand';

interface ImageState {
    imageFile: string;
    updateImageFile: (arg0: string) => void;
}

export const useImgStore = create<ImageState>(set => ({
    imageFile: '',
    updateImageFile: (newImageFile) => set(state => ({imageFile: newImageFile}))
}));

interface GameIdState {
    gameId: string;
    updateGameId: (arg0: string) => void;
}

export const useGameIdStore = create<GameIdState>(set => ({
    gameId: '',
    updateGameId: (newId) => set(state => ({gameId: newId}))
}));



