export const enum ErrorType {
  USER_NOT_FOUND = 'No User found with that ID',
  TODO_NOT_FOUND = 'No Todo found with that ID',
  NO_EMAIL_AND_PASSWORD = 'Please provide email and password',
  INCORRECT_EMAIL_OR_PASSWORD = 'Incorrect email or password',
  UNAUTHORIZED_ACCESS = 'You do not have permisson to perform this action',
  LOGIN_PROMPT = 'You are not logged in. Please log in!',
  TOKEN_USER_EXPIRY = 'The user belonging to this token does no longer exist',
  INVALID_TOKEN = 'This is invalid token',
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}
