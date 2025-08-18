export class UniqueError extends Error {
  public field: string;
  public status: number = 400;

  constructor(field: string, message: string) {
    super(message);
    this.field = field;
    this.name = "UniqueError";
  }
}
