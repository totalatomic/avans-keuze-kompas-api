import { Request } from "@nestjs/common";
export function extractTokenfromRequest(request: Request): string | undefined {
  const [type, token] = request.headers['authorization']?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}