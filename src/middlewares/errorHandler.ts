import http from 'http';

export const catchErrors = (cb: () => void, errorMessage: string) => {
    try {
        cb();
    } catch (error) {
        throw new Error(errorMessage);
    }
};

export const handleNotFound = (res: http.ServerResponse) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(({ message: 'Not Found' })));
}

export const handleInvalidUUID = (res: http.ServerResponse) => {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(({ message: 'Invalid id.' })));
}

export const handleServerError = (res: http.ServerResponse) => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
}

export const handleInvalidPaylod = (res: http.ServerResponse) => {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Invalid user payload." }));
}

export const handleMethodNotAllowed = (res: http.ServerResponse) => {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Method Not Allowed' }));
}


