import { AnimalTypes } from "../generated/prisma";

export type AnimalTypesResponse = {
  id: number;
  name: string;
  description?: string | null;
  created_at: Date | null;
  updated_at: Date | null;
};

export type CreateAnimalTypesRequest = {
  name: string;
  description?: string | null;
};

export function toAnimalTypesResponse(
  animalTypes: AnimalTypes
): AnimalTypesResponse {
  return {
    id: animalTypes.id,
    name: animalTypes.name,
    description: animalTypes.description,
    created_at: animalTypes.created_at,
    updated_at: animalTypes.updated_at,
  };
}
