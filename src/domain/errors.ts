export class InvalidInputError extends Error {
  status: number;
  constructor(message: string = 'Bad request') {
    super(message);
    this.status = 400;
  }
};

export class UnauthorizedError extends Error {
  status: number;
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.status = 401;
  }
};
