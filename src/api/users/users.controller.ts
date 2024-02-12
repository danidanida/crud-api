import { ServerResponse, IncomingMessage } from 'http';
import { User } from '../../types/user.interface';
import { findAll, find, create, update, deleteById } from "./users.model";
import { handleInvalidUUID, handleNotFound, handleInvalidPaylod, handleServerError } from '../../middlewares/errorHandler';
import { handleResponse } from '../../middlewares/handleResponse';

export const getAllUsers = (res: ServerResponse) => {
    const users = findAll();
    handleResponse(res, 200, users || [])
}

export const getUserById = (id: string, res: ServerResponse) => {
    const user = find(id);
    if (user) {
        handleResponse(res, 200, user || [])
    } else {
        handleNotFound(res);
    }
}

export const createUser = (res: ServerResponse, parsedBody: any) => {
    try {
        const newUser = create(parsedBody);
        handleResponse(res, 201, newUser)
    } catch (error) {
        handleInvalidPaylod(res);
    }
};

export const updateUser = (res: ServerResponse, parsedBody: any, id: string) => {
    try {
        let user: User | undefined = find(id);

        if (!user) {
            handleNotFound(res)
        }
        const updatedUser = update(id, parsedBody)
        handleResponse(res, 200, updatedUser || {})
    } catch (error) {
        handleInvalidPaylod(res);
    }
};

export const deleteUserById = (id: string, res: ServerResponse) => {
    const user = find(id);
    if (user) {
        let result = deleteById(id);
        if (result) {
            handleResponse(res, 204, [])
        } else {
            handleServerError(res)
        }
    } else {
        handleNotFound(res);
    }
}