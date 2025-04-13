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

export class NotFoundError extends Error {
  status: number;
  constructor(message: string = 'Not found') {
    super(message);
    this.status = 404;
  }
};
