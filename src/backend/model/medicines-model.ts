import { Medicines, MedicinesType, MedicineUnit } from "../generated/prisma";

export type MedicinesResponse = {
  id: number;
  name: string;
  code: string;
  type: MedicinesType;
  unit: MedicineUnit;
  stock_qty: number;
  price: number;
  is_active: boolean;
  created_at: Date | null;
  updated_at: Date | null;
};

export type CreateMedicinesRequest = {
  name: string;
  code: string;
  type: MedicinesType;
  unit: MedicineUnit;
  stock_qty: number;
  price: number;
  is_active: boolean;
};

export type UpdateMedicinesRequest = {
  id: number;
  name?: string;
  code?: string;
  type?: MedicinesType;
  unit?: MedicineUnit;
  stock_qty?: number;
  price?: number;
  is_active?: boolean;
};

export function toMedicinesResponse(medicines: Medicines): MedicinesResponse {
  return {
    id: medicines.id,
    name: medicines.name,
    code: medicines.code,
    type: medicines.type,
    unit: medicines.unit,
    stock_qty: medicines.stock_qty,
    price: Number(medicines.price),
    is_active: medicines.is_active,
    created_at: medicines.created_at,
    updated_at: medicines.updated_at,
  };
}
