import * as constantLocation from "./constants/location";
import * as utilsLocation from "./utils/location";
const location = Object.assign({}, constantLocation, utilsLocation);

import * as constantName from "./constants/name";
import * as utilsName from "./utils/name";
const name = Object.assign({}, constantName, utilsName);

import * as validator from "./utils/validator";

import * as constantPkg from "./constants/pkg";
import * as modelsPkg from "./models/pkg";
import * as utilsPkg from "./utils/pkg";
const pkg = Object.assign({}, constantPkg, modelsPkg, utilsPkg);

import * as tsconfig from "./models/tsconfig";

import * as array from "./utils/array";

export { location, name, validator, pkg, tsconfig, array };
