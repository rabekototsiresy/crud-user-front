/**
 * 
 * @param obj object source
 * @param keys key to except
 * @returns objet with key except
 */
export const extract = (obj: any, ...keys: any) => {
  const newObject = Object.assign({});
  Object.keys(obj).forEach((key) => {
     if(keys.includes(key)){
        newObject[key] = obj[key];
        delete obj[key];
     };
  });
  return newObject;
};