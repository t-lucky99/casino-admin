
import { GameSchema } from "@/schemas";

const ProviderIdSchema = GameSchema.pick({
    providerId: true,
});
const TypeIdSchema = GameSchema.pick({
    typeId: true,
});  
const ReleaseDateSchema = GameSchema.pick({
    releaseDate: true,
});

export const validateProviderId = (id: string) => {
    const validationResult = ProviderIdSchema.safeParse({ providerId: id });
    if (!validationResult.success) {
        return validationResult.error.issues[0].message;
    } else {
        return '';
    }    
  };

export const validateTypeId = (id: string) => {
    const validationResult = TypeIdSchema.safeParse({ typeId: id });
    if (!validationResult.success) {
        return validationResult.error.issues[0].message;
    } else {
        return '';
    }    
  };

export const validateReleaseDate = (date: Date) => {
    const validationResult = ReleaseDateSchema.safeParse({ releaseDate: date });
    if (!validationResult.success) {
        return 'Required field';
    } else {
        return '';
    }    
  };  