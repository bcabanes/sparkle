import { IUser } from '../user.model';

export namespace UserState {
  export interface IState {
    current?: IUser;
    errors?: Array<any>;
  }

  export const initialState: IState = {
    current: null,
    errors : []
  };
}
