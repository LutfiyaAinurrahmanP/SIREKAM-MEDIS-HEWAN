import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateTreatmentNotesRequest,
  toTreatmentNotesResponse,
  TreatmentNotesResponse,
  UpdateTreatmentNotesRequest,
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

  static async list(): Promise<TreatmentNotesResponse[]> {
    const treatmentNotes = await prismaClient.treatmentNotes.findMany();
    return treatmentNotes.map(toTreatmentNotesResponse);
  }

  static async checkTreatmentNotesMustExists(treatmentNotesId: number) {
    const treatmentNotes = await prismaClient.treatmentNotes.findUnique({
      where: {
        id: treatmentNotesId,
      },
    });

    if (!treatmentNotes) {
      throw new ResponseError(404, "Data catatan perawatan tidak ditemukan!");
    }
    return treatmentNotes;
  }

  static async get(treatmentNotesId: number): Promise<TreatmentNotesResponse> {
    const treatmentNotes = await this.checkTreatmentNotesMustExists(
      treatmentNotesId
    );
    return toTreatmentNotesResponse(treatmentNotes);
  }

  static async update(
    res: UpdateTreatmentNotesRequest
  ): Promise<TreatmentNotesResponse> {
    const updateRequest = Validation.validate(
      TreatmentNotesValidation.UPDATE,
      res
    );
    await this.checkTreatmentNotesMustExists(updateRequest.id);

    const treatmentNotes = await prismaClient.treatmentNotes.update({
      where: {
        id: updateRequest.id,
      },
      data: {
        ...updateRequest,
        updated_at: new Date(),
      },
    });

    return toTreatmentNotesResponse(treatmentNotes);
  }
}
