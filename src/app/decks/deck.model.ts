export interface IDeck {
  title: string;
  frequency: number;
  days: number;
  startTime: string;
  endTime: string;
  uid: string;
}

export class Deck implements IDeck {
  title = null;
  frequency = null;
  days = null;
  startTime = null;
  endTime = null;
  uid = null;

  constructor(object: any) {
    for (const property in this) {
      if (this.hasOwnProperty(property) && object.hasOwnProperty(property)) {
        this[ property ] = object[ property ];
      }
    }
    if (object.hasOwnProperty('$key')) {
      this.uid = object.$key;
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
