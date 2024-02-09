import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { getAllUsers, getUserById, createUser, updateUser, deleteUserById } from './users.controller';
import { handleMethodNotAllowed, handleInvalidUUID } from '../../middlewares/errorHandler';
import { validateUserModel } from '../../middlewares/validateModel';
import { extractUUIDFromPath } from '../../utils/extractUuidFromPath';

export const handleUsersRequest = async (req: IncomingMessage, res: ServerResponse) => {
    const { method } = req;

    const url = req.url || '/';
    const parsedUrl = parse(url, true);
    const path = parsedUrl.pathname;

    let uuid: string;

    switch (method) {
        case 'GET':
            if (path === '/api/users') {
                getAllUsers(res);
            } else if (path?.startsWith('/api/users/')) {
                uuid = extractUUIDFromPath(path);
                getUserById(uuid, res);
            }
            break;
        case 'POST':
            validateUserModel(req, res, (req, parsedBody) => createUser(res, parsedBody));
            break;

        case 'PUT':
            uuid = extractUUIDFromPath(path);
            if (!uuid) {
                handleInvalidUUID(res);
                return;
            }

            validateUserModel(req, res, (req, parsedBody) => updateUser(res, parsedBody, uuid));

            break;
        case 'DELETE':
            uuid = extractUUIDFromPath(path);
            deleteUserById(uuid, res)
            break;
        default:
            handleMethodNotAllowed(res)
    }
};