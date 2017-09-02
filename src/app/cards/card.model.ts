export interface ICard {
  deckUid: string | null;
  title: string | null;
  content: string | null;
  lastViewed: string | null;
  uid: string | null;
}

export class Card implements ICard {
  deckUid = null;
  title = null;
  content = null;
  lastViewed = null;
  uid = null;

  constructor(object: any) {
    for (const property in this) {
      if (this.hasOwnProperty(property) && object.hasOwnProperty(property)) {
        this[ property ] = object[ property ];
      }
    }
  }

  serialize(): ICard {
    const serializedCard = {};
    for (const property in this) {
      if (this.hasOwnProperty(property)) {
        Object.defineProperty(serializedCard, property, {
          enumerable: true,
          value     : this[ property ]
        });
      }
    }
    return serializedCard as ICard;
  }
}
