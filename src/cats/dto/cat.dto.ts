import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cat.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '32124124',
    description: 'id',
  })
  id: string;
}
