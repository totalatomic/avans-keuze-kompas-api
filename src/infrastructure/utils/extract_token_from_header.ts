import { Request } from 'express'; // express.Request

export function extractTokenfromRequest(request: Request): string | undefined {
  // 1️⃣ Try cookie first
  const cookie = request.headers.cookie; // "auth=token; other=value"
  if (!cookie) {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  if (cookie) {
    const authCookie = cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('auth='));
    if (authCookie) {
      const [, token] = authCookie.split('=');
      const type = 'Bearer';
      return type === 'Bearer' ? token : undefined;
    }
  }

  // 2️⃣ Fallback to Authorization header
}
