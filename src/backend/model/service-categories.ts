import { ServiceCategories } from "../generated/prisma";

export type ServiceCategoriesResponse = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  is_active: boolean;
  created_at: Date | null;
  updated_at: Date | null;
};

export type CreateServiceCategoriesRequest = {
  name: string;
  description: string | null;
  price: number;
  is_active: boolean;
};

export type UpdateServiceCategoriesRequest = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  is_active: boolean;
};

export function toServiceCategoriesResponse(
  serviceCategoris: ServiceCategories
): ServiceCategoriesResponse {
  return {
    id: serviceCategoris.id,
    name: serviceCategoris.name,
    description: serviceCategoris.description,
    price: Number(serviceCategoris.price),
    is_active: serviceCategoris.is_active,
    created_at: serviceCategoris.created_at,
    updated_at: serviceCategoris.updated_at,
  };
}
