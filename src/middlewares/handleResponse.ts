import { ServerResponse } from 'http';

export const handleResponse = (res: ServerResponse, status: number, resObj: any) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        statusCode: status,
        data: resObj
    }));
}
