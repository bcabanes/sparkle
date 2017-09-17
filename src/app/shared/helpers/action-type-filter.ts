import { Action } from '@ngrx/store';

export function ofTypeFilter(...allowedTypes: string[]): (action: Action) => boolean {
  return (action: Action): boolean =>
    allowedTypes.some((type: string) => type === action.type);
}
