import { validationErrorDefaultMessage } from "./constants"

const errorTypes = new Map([
    ['required', 'This field is required'],
    ['minLength', 'This field should be at least {minLength} characters long'],
    ['maxLength', 'This field should be at most {maxLength} characters long'],
])

export function getValidationError(error) {
    return errorTypes.get(error) || validationErrorDefaultMessage
}