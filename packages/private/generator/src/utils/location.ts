import { join } from "path";
import { escape } from "querystring";
import { GH_REPOLINK, GH_BRANCH } from "../constants/location";

/**
 * build file/directory relative path from input package information
 * @param category package category
 * @param name package name
 * @param args filepath from package location
 * @returns relative path from generator to input filepath
 */
export const buildPath = (category: string, name: string, ...args: string[]) =>
  join("..", "..", category, name, ...args);

export const buildConditionPath = (
  condition: boolean,
  category: string,
  name: string,
  ...args: string[]
) => (condition ? buildPath(category, name, ...args) : null);

/**
 * build package relative path from root directory
 * @param category package category
 * @param name package name
 * @param safe return url safe string
 * @returns packages path
 */
export const buildPackagePath = (
  category: string,
  name: string,
  safe: boolean = false
) => {
  const output = `packages/${category}/${name}`;
  return safe ? escape(output) : output;
};

export const buildPackageUrl = (category: string, name: string) =>
  `${GH_REPOLINK}/tree/${GH_BRANCH}/${buildPackagePath(category, name, false)}`;
