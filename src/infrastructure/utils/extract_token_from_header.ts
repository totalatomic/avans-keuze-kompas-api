import request from 'supertest';
export function extractTokenfromRequest(request: Request): string | undefined {
  const [type, token] = request.headers['authorization']?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}