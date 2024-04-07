export type TTypes =
  | "Ошибка"
  | "Новая функциональность"
  | "Улучшение"
  | "Документация";

export interface IRequest {
  id: string;
  createdAt: Date;
  requestNumber: number;
  type: TTypes;
  caption: string;
  username: string;
  status: string;
  img?: File | null;
}

export interface IForm {
  username: string;
  type: string;
  caption: string;
  img?: File | null;
}

export type TResponseBody<TDataKey extends string = "", TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  message?: string;
  headers?: Headers;
};

export type TEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type TStateLocation = Location & {
  state: {
    background: Location;
  };
};

export interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

export interface IKeyboardEvent {
  key: string;
}

export interface IModalOverlayProps {
  onClose: () => void;
}

export interface Params {
  id: string;
}
