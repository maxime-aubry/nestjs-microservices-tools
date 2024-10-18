import { Injectable } from '@nestjs/common';
import { password } from 'bun';
import type { IHashService } from './hash.interface';

@Injectable()
export class HashService implements IHashService {
  rounds = 10;

  public async hashAsync(value: string): Promise<string> {
    return await password.hash(value);
  }

  public async compareAsync(value: string, hashValue: string): Promise<boolean> {
    return await password.verify(value, hashValue);
  }
}
