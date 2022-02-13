export const CHILD_METADATA_KEY = 'custom:input:child';

export default function Child() {
  return function(constructor: Function) {
    Reflect.defineMetadata(CHILD_METADATA_KEY, true, constructor.prototype);
  }
}