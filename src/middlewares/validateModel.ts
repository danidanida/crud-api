import { IncomingMessage, ServerResponse } from 'http';
import { handleInvalidPaylod } from './errorHandler';

export const validateUserModel = (req: IncomingMessage,
    res: ServerResponse,
    onSuccess: (res: ServerResponse, parsedBody: any) => void) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const parsedBody = JSON.parse(body);
            if (typeof parsedBody.username !== 'string' || typeof parsedBody.age !== 'number') {
                handleInvalidPaylod(res);
            }
            if (parsedBody.hobbies && !Array.isArray(parsedBody.hobbies)) {
                handleInvalidPaylod(res);
            }
            onSuccess(res, parsedBody);
        } catch (error) {
            handleInvalidPaylod(res);
        }
    });
};