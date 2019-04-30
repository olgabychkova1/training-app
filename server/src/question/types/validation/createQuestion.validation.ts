import { object } from 'yup'
import { CreateQuestion } from '../inputs'
import { textMessageError, titleMessageError, questionLevelMessageError } from './errorMessage'
import { ValidationError } from 'src/validation/errorInput/ValidationError'
import { inputErrors } from 'src/validation/errorInput/inputError'

export const createQuestionValidation = async (data: CreateQuestion) => {
    const schemaValidation = await object().shape({
        title: textMessageError(),
        text: titleMessageError(),
        level: questionLevelMessageError(),
    })

    try {
        await schemaValidation.validate(data, { abortEarly: false })
    } catch (err) {
        throw new ValidationError(inputErrors(err))
    }
}
