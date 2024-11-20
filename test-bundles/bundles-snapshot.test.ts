import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, it, expect } from 'vitest';

describe('Dist bundle', () => {
  it('is unchanged', () => {
    const bundle = readFileSync(
      join(__dirname, '../', 'dist/index.esm.js'),
      'utf8'
    );
    expect(bundle).toMatchSnapshot();
  });
});
