export const BUTTON_NEXT: "BUTTON_NEXT" = "BUTTON_NEXT";
export const BUTTON_PREV: "BUTTON_PREV" = "BUTTON_PREV";

export interface IButtonNextAction {
  readonly type: typeof BUTTON_NEXT;
  readonly page: number;
}

export interface IButtonPrevAction {
  readonly type: typeof BUTTON_PREV;
  readonly page: number;
}

export type TPaginationActions = IButtonNextAction | IButtonPrevAction;

export function onCkickNext(page: number): IButtonNextAction {
  return {
    type: BUTTON_NEXT,
    page,
  };
}

export function onCkickPrev(page: number): IButtonPrevAction {
  return {
    type: BUTTON_PREV,
    page,
  };
}
