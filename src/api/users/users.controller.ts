import { ServerResponse, IncomingMessage } from 'http';
import { User } from '../../types/user.interface';
import { findAll, find, create, update, deleteById } from "./users.model";
import { handleInvalidUUID, handleNotFound, handleInvalidPaylod, handleServerError } from '../../middlewares/errorHandler';
import { formatJSONResponse } from '../../middlewares/formatResponse';

export const getAllUsers = (res: ServerResponse) => {
    const users = findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(formatJSONResponse(200, users || []));
}

export const getUserById = (id: string, res: ServerResponse) => {
    const user = find(id);
    if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(formatJSONResponse(200, user));
    } else {
        handleInvalidUUID(res);
    }
}

export const createUser = (res: ServerResponse, parsedBody: any) => {
    try {
        const newUser = create(parsedBody);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(formatJSONResponse(201, newUser));
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

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(formatJSONResponse(200, updatedUser || {}));
    } catch (error) {
        handleInvalidPaylod(res);
    }
};

export const deleteUserById = (id: string, res: ServerResponse) => {
    const user = find(id);
    if (user) {
        let result = deleteById(id);
        if (result) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(formatJSONResponse(204, []));
        } else {
            handleServerError(res)
        }
    } else {
        handleInvalidUUID(res);
    }
}