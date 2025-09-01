import { prismaClient } from "../application/database";
import {
  CreateTreatmentNotesRequest,
  toTreatmentNotesResponse,
  TreatmentNotesResponse,
} from "../model/treatment-notes-model";
import { TreatmentNotesValidation } from "../validation/treatment-notes-validation";
import { Validation } from "../validation/validation";

export class TreatmentNotesService {
  static async create(
    req: CreateTreatmentNotesRequest
  ): Promise<TreatmentNotesResponse> {
    const createRequest = Validation.validate(
      TreatmentNotesValidation.CREATE,
      req
    );

    const record = {
      ...createRequest,
      created_at: new Date(),
    };

    const treatmentNotes = await prismaClient.treatmentNotes.create({
      data: record,
    });

    return toTreatmentNotesResponse(treatmentNotes);
  }
}
