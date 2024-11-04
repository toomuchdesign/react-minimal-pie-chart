/**
 * @jest-environment node
 */
import { getArcInfo } from '../getArcInfo';
import { makePathCommands } from '../../../src/Path';

function getArcInfoFromDAttribute(d: string) {
  // @ts-expect-error We are providing getArcInfo with a partial input
  return getArcInfo({
    getAttribute: () => d,
  });
}

describe('getArcInfo test utility', () => {
  it.only.each`
    descr                    | cx         | cy         | startAngle | lengthAngle | radius
    ${'integer values'}      | ${50}      | ${50}      | ${0}       | ${90}       | ${25}
    ${'decimal cx'}          | ${222.222} | ${50}      | ${0}       | ${90}       | ${25}
    ${'decimal cy'}          | ${50}      | ${222.222} | ${0}       | ${90}       | ${25}
    ${'decimal startAngle'}  | ${50}      | ${50}      | ${222.222} | ${90}       | ${25}
    ${'decimal lengthAngle'} | ${50}      | ${50}      | ${0}       | ${222.222}  | ${25}
    ${'decimal radius'}      | ${50}      | ${50}      | ${0}       | ${90}       | ${222.222}
  `('$descr', ({ cx, cy, startAngle, lengthAngle, radius }) => {
    const d = makePathCommands(cx, cy, startAngle, lengthAngle, radius);
    const arcInfo = getArcInfoFromDAttribute(d);
    const expected = {
      startAngle: expect.toEqualWithRoundingError(startAngle),
      lengthAngle: expect.toEqualWithRoundingError(lengthAngle),
      radius,
      center: {
        x: expect.toEqualWithRoundingError(cx),
        y: expect.toEqualWithRoundingError(cy),
      },
    };

    expect(arcInfo).toMatchObject(expected);
  });
});
