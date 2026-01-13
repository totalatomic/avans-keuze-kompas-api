import { Request } from 'express'; // make sure this is express.Request

export function extractTokenfromRequest(request: Request): string | undefined {
  // Read the "auth" cookie
  const cookie = request.headers.cookie; // raw cookie header: "auth=eyJhbGciOi...; other=value"
  if (!cookie) return undefined;

  // Find the auth cookie
  const authCookie = cookie
    .split(';') // split multiple cookies
    .map((c) => c.trim()) // remove spaces
    .find((c) => c.startsWith('auth='));

  if (!authCookie) return undefined;

  // Split "auth=token" and manually set type to "Bearer"
  const [, token] = authCookie.split('=');
  const type = 'Bearer';

  return type === 'Bearer' ? token : undefined;
}
