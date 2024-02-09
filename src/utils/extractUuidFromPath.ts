export function extractUUIDFromPath(path: any) {
    return path.startsWith('/api/users/') ? path.substring(11) : null;
}