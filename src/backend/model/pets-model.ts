import { Gender, Pets } from "../generated/prisma";

export type PetsResponse = {
  id: number;
  owner_id: number;
  name: string;
  animal_type_id: number;
  breed?: string | null;
  gender: Gender;
  birth_date?: Date | null;
  weight: number;
  color?: string | null;
  notes?: string | null;
  created_at: Date | null;
  updated_at: Date | null;
};

export type CreatePetsRequest = {
  owner_id: number;
  name: string;
  animal_type_id: number;
  breed?: string | null;
  gender: Gender;
  birth_date?: Date | null;
  weight: number;
  color?: string | null;
  notes?: string | null;
};

export type UpdatePetsRequest = {
  id: number;
  owner_id: number;
  name: string;
  animal_type_id: number;
  breed?: string | null;
  gender: Gender;
  birth_date?: Date | null;
  weight: number;
  color?: string | null;
  notes?: string | null;
};

export function toPetsResponse(pets: Pets): PetsResponse {
  return {
    id: pets.id,
    owner_id: pets.owner_id,
    name: pets.name,
    animal_type_id: pets.animal_type_id,
    breed: pets.breed,
    gender: pets.gender,
    birth_date: pets.birth_date,
    weight: Number(pets.weight),
    color: pets.color,
    notes: pets.notes,
    created_at: pets.created_at,
    updated_at: pets.updated_at,
  };
}
