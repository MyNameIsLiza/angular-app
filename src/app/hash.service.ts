import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HashService {
  hashCode(s: string): number {
    const hash = s.split("").reduce(function(a, b) {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return hash + 2147483647 + 1;
  }

  constructor() {}
}
