import { PARAM_ARGS_METADATA } from '@nestjs/websockets/constants';
import { ExecutionContext } from '@nestjs/common';
import { assignCustomParameterMetadata } from '@nestjs/common/utils/assign-custom-metadata.util';

export function RequestId(): ParameterDecorator {
  return function (target, key, index) {
    const args =
      Reflect.getMetadata(PARAM_ARGS_METADATA, target.constructor, key) || {};
    const meta = assignCustomParameterMetadata(
      args,
      'RequestId',
      index,
      (data, input: ExecutionContext) => {
        return input.getArgByIndex<string>(3);
      },
    );
    Reflect.defineMetadata(PARAM_ARGS_METADATA, meta, target.constructor, key);
  };
}
