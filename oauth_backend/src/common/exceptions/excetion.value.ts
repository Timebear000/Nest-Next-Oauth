import {
  ForbiddenException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

export function PermissionError(data: string) {
  throw new ForbiddenException(` your is not ${data} owner`);
}

export function NotFoundData(data: string) {
  throw new ForbiddenException(`${data} is not found`);
}
export function BadRequestData() {
  throw new BadRequestException('Bad Request Send');
}
export function DupleError(data) {
  throw new ConflictException(`${data}`);
}
