import { AnimalTypes, User } from "../generated/prisma";

export interface AnimalTypesRequest {
    user?: User;
    animalTypes?: AnimalTypes;
}