export function firebaseObjectToArray(object: { [key: string]: any }): any[] {
  return Object.keys(object).map(key => {
    const temp = object[key];
    temp.uid = key;
    return temp;
  });
}
