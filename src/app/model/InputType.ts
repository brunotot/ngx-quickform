export const METADATA_KEY_PREFIX = 'input:quickform:';

export function getMetadataKeyName(inputType: InputType) {
  return `${METADATA_KEY_PREFIX}${inputType}`
}

export enum InputType {
  TEXT = 0,
  CHECKBOX,
  TABLE,
  SELECT
}