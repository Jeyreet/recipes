const errorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  ACCESS_ERROR: 'ACCESS_ERROR',
  DATA_NOT_FOUND_ERROR: 'DATA_NOT_FOUND_ERROR',
  DUPLICATE_VALUE_ERROR: 'DUPLICATE_VALUE_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
}

type Details = Record<string, any>

class ApiError extends Error {
  status
  code
  details

  constructor(status: number, code: string, details: Details) {
    super()
    this.status = status
    this.code = code
    this.details = details
  }
}

type ValidationErrorSchema = {
  error: string
  [x: string]: string
}

class ValidationError extends ApiError {
  constructor(errors: Array<ValidationErrorSchema> | ValidationErrorSchema) {
    super(400, errorCodes.VALIDATION_ERROR, { errors: Array.isArray(errors) ? errors : [errors] })
  }
}

class AuthError extends ApiError {
  constructor(authNeeded: boolean) {
    super(401, errorCodes.AUTH_ERROR, { authNeeded })
  }
}

class AccessError extends ApiError {
  constructor(permission: string) {
    super(403, errorCodes.ACCESS_ERROR, { permission })
  }
}

class DataNotFoundError extends ApiError {
  constructor(details: Details) {
    super(404, errorCodes.DATA_NOT_FOUND_ERROR, details)
  }
}

class DuplicateValueError extends ApiError {
  constructor(key: string, value: any) {
    super(409, errorCodes.DUPLICATE_VALUE_ERROR, { [key]: value })
  }
}

export { errorCodes, ApiError, ValidationError, AuthError, AccessError, DataNotFoundError, DuplicateValueError }
