export class IUser {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string | null;
  uid: string | null;
  isAnonymous: boolean;
}

export class User implements IUser {
  displayName = null;
  email = null;
  emailVerified = false;
  phoneNumber = null;
  photoURL = null;
  providerId = null;
  uid = null;
  isAnonymous = false;

  constructor(object: any) {
    for (const property in this) {
      if (this.hasOwnProperty(property) && object.hasOwnProperty(property)) {
        this[ property ] = object[ property ];
      }
    }

    console.log(this);
  }

  serialize(): IUser {
    const serializedUser = {};
    for (const property in this) {
      if (this.hasOwnProperty(property)) {
        Object.defineProperty(serializedUser, property, {
          enumerable: true,
          value     : this[ property ]
        });
      }
    }
    return serializedUser as IUser;
  }
}

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
