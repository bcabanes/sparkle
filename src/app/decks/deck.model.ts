export interface IDeck {
  title: string | null;
  content: string | null;
  lastViewed: string | null;
  uid: string | null;
}

export class Deck implements IDeck {
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

  serialize(): IDeck {
    const serializedDeck = {};
    for (const property in this) {
      if (this.hasOwnProperty(property)) {
        Object.defineProperty(serializedDeck, property, {
          enumerable: true,
          value     : this[ property ]
        });
      }
    }
    return serializedDeck as IDeck;
  }
}
