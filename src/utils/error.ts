class BaseError extends Error {
  public readonly name: string;
  public readonly isOperational: boolean;

  constructor(name: string, description: string) {
    super(description);
    this.name = name;
    Error.captureStackTrace(this);
  }
}

export class DatabaseInsertError extends BaseError {
  constructor(
    name = "DatabaseInsertError",
    description = "Database Insert Error"
  ) {
    super(name, description);
  }
}
