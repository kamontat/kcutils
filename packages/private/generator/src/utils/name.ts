import { Categories, Namespaces } from "../constants/name";

/**
 * return true if input category is valid
 * @param category package category
 * @return true or false
 */
export const validateCategory = (category: string) => {
  (Object.keys(Categories) as (keyof typeof Categories)[]).some((key) => {
    return Categories[key] === category;
  });
};

/**
 * return true if input namespace is valid
 * @param namespace package namespace
 * @return true or false
 */
export const validateNamespace = (namespace: string) => {
  (Object.keys(Namespaces) as (keyof typeof Namespaces)[]).some((key) => {
    return Namespaces[key] === namespace;
  });
};

export const toNamespace = (category: string) => {
  switch (category) {
    case Categories.Private:
      return Namespaces.Private;
    case Categories.Type:
      return Namespaces.Type;
    case Categories.Config:
      return Namespaces.Config;
    case Categories.Internal:
      return Namespaces.Internal;
    case Categories.Public:
      return Namespaces.Public;
    default:
      throw new Error(
        `cannot convert unknown category to namespace (${category})`
      );
  }
};

/**
 * convert package information to valid npm package name
 * @param category package category
 * @param name package name
 * @returns valid npm package name
 * @throw Error if category is not valid
 */
export const toPackageName = (category: string, name: string) =>
  `@${toNamespace(category)}/${name}`;

/**
 * convert raw string to valid name with following condition
 * 1. replace space with dash (-)
 * 2. to lower case all character
 * @param name raw name
 * @returns name that support in npm package name
 */
export const toSafeName = (name: string) =>
  name.replace(/ /g, "-").toLowerCase();
