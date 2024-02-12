import http from 'http';
import { handleUsersRequest } from './api/users/handler';
import { handleNotFound, handleServerError } from './middlewares/errorHandler';
import { URL } from 'url';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const requestHandler = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
        const reqUrl = new URL(req.url!, `http://localhost:${PORT}`);

        if (reqUrl.pathname.startsWith('/api/users')) {
            await handleUsersRequest(req, res);
        } else {
            handleNotFound(res)
        }
    } catch (error) {
        handleServerError(res)
    }
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});