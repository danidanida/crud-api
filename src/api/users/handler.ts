import { IncomingMessage, ServerResponse } from 'http';

export const handleUsersRequest = async (req: IncomingMessage, res: ServerResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Fetching users' }));
      break;
    case 'POST':
      break;
    default:
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Method Not Allowed' }));
  }
};