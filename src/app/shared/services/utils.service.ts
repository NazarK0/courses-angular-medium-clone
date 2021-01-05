import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  range(start: number, end: number): number[] {
    const width = end - start;
    return [...Array(width > 1 ? width : []).keys()]
      .map((element) => element + start);
  }
}
