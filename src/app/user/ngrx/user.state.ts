export interface User {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
  isAnonymous: boolean;
}

export namespace UserState {
  export interface IState {
    current?: User;
    errors?: Array<any>;
  }

  export const initialState: IState = {
    current: null,
    errors: []
  };
}
