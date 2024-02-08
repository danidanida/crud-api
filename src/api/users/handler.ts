import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { getAllUsers, getUserById, createUser } from './users.controller';
import { handleMethodNotAllowed } from '../../middlewares/errorHandler';

export const handleUsersRequest = async (req: IncomingMessage, res: ServerResponse) => {
    const { method } = req;

    const url = req.url || '/';
    const parsedUrl = parse(url, true);
    const path = parsedUrl.pathname;

    switch (method) {
        case 'GET':
            if (path === '/api/users') {
                getAllUsers(res);
            } else if (path?.startsWith('/api/users/')) {
                const uuid = path.substring(11);
                getUserById(uuid, res);
            }
            break;
        case 'POST':
            createUser(req, res);
            break;
        default:
            handleMethodNotAllowed(res)
    }
};