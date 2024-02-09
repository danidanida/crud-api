import { User } from './../types/user.interface';

export const formatJSONResponse = (statusCode: number, response: User[] | User | {}) => {
    return JSON.stringify({
        statusCode: statusCode,
        data: response
    })
}