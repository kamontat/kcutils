import { Categories } from "../constants/name";

/**
 * return true if package is private
 * @param category package category
 * @returns true or false
 */
export const isPrivate = (category: string) => category === Categories.Private;
