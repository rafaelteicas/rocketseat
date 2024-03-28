export class AppError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
    this.name = "AppError";
  }
}