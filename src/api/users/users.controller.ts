import { ServerResponse, IncomingMessage } from 'http';
import { findAll, find, create } from "./users.model";
import { handleInvalidUUID, handleNotFound, handleInvalidPaylod } from '../../middlewares/errorHandler';

export const getAllUsers = (res: ServerResponse) => {
    const users = findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ data: users || [] }));
}

export const getUserById = (id: string, res: ServerResponse) => {
    const user = find(id);
    if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: user }));
    } else {
        handleInvalidUUID(res);
    }
}

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const user = JSON.parse(body);
            create(user);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "User successfuly created." }));
        } catch (error) {
            handleInvalidPaylod(res);
        }
    });
}