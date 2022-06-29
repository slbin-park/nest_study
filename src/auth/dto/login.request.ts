import { PickType } from '@nestjs/swagger';
import { Cat } from 'src/cats/cat.schema';

export class LoginRequestDto extends PickType(Cat, [
  'email',
  'password',
] as const) {}
