import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { getAllUsers, getUserById, createUser, updateUser, deleteUserById } from './users.controller';
import { handleMethodNotAllowed, handleInvalidUUID } from '../../middlewares/errorHandler';
import { validateUserModel } from '../../middlewares/validateModel';
import { extractUUIDFromPath } from '../../utils/extractUuidFromPath';
import { isValidUuidV4 } from '../../utils/isValidUuidV4';

export const handleUsersRequest = async (req: IncomingMessage, res: ServerResponse) => {
    const { method } = req;

    const url = req.url || '/';
    const parsedUrl = parse(url, true);
    const path = parsedUrl.pathname;

    let uuid: string;


    const handleUUID = (cb: (uuid: string, res: ServerResponse) => void) => {
        uuid = extractUUIDFromPath(path);
        if (isValidUuidV4(uuid)) {
            cb(uuid, res);
        } else {
            handleInvalidUUID(res)
        }
    }

    switch (method) {
        case 'GET':
            if (path === '/api/users') {
                getAllUsers(res);
            } else if (path?.startsWith('/api/users/')) {
                handleUUID(() => getUserById(uuid, res))
            }
            break;
        case 'POST':
            validateUserModel(req, res, (req, parsedBody) => createUser(res, parsedBody));
            break;
        case 'PUT':
            handleUUID(() => validateUserModel(req, res, (req, parsedBody) => updateUser(res, parsedBody, uuid)))
            break;
        case 'DELETE':
            handleUUID(() => deleteUserById(uuid, res));
            break;
        default:
            handleMethodNotAllowed(res)
    }
};