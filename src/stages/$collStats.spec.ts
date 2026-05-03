import { expectTypeOf } from 'expect-type';
import { aggregate } from '../aggregate';
import { ExtractDocumentType } from '../testing/extract-document-type';
import { ObjectId } from 'mongodb';
import { AnyObject } from '../types/object';

describe('$changeStreamSplitLargeEvent', () => {
  describe('Output', () => {
    type InputDocument = {
      _id: ObjectId;
      n: number;
      b: boolean;
    };

    it('should include basic cluster information', () => {
      const _result = aggregate<InputDocument>().$collStats({});
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result>().toEqualTypeOf<{
        ns: string;
        shard?: string;
        host: string;
        localTime: Date;
      }>();
    });

    it('should include latencyStats', () => {
      const _result = aggregate<InputDocument>().$collStats({
        latencyStats: {}
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Pick<Result, 'latencyStats'>>().toEqualTypeOf<{
        latencyStats: {
          commands: {
            latency: number;
            ops: number;
          };
          reads: {
            latency: number;
            ops: number;
          };
          writes: {
            latency: number;
            ops: number;
          };
          transactions: {
            latency: number;
            ops: number;
          };
        };
      }>();
    });

    it('should include histograms in latencyStats', () => {
      const _result = aggregate<InputDocument>().$collStats({
        latencyStats: { histogram: true }
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Result['latencyStats']['commands']>().branded.toEqualTypeOf<{
        latency: number;
        ops: number;
        histogram: {
          micros: number;
          count: number;
        }[];
      }>();
    });

    it('should include storageStats', () => {
      const _result = aggregate<InputDocument>().$collStats({
        storageStats: {}
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Pick<Result, 'storageStats'>>().toEqualTypeOf<{
        storageStats: AnyObject;
      }>();
    });

    it('should include count', () => {
      const _result = aggregate<InputDocument>().$collStats({ count: {} });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Pick<Result, 'count'>>().toEqualTypeOf<{
        count: number;
      }>();
    });

    it('should include queryExecStats', () => {
      const _result = aggregate<InputDocument>().$collStats({
        queryExecStats: {}
      });
      type Result = ExtractDocumentType<typeof _result>;
      expectTypeOf<Pick<Result, 'queryExecStats'>>().toEqualTypeOf<{
        queryExecStats: {
          total: number;
          nonTailable: number;
        };
      }>();
    });
  });
});
