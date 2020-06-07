import { Classify } from "./models/query/Classify";
import { QueryBuilder } from "./models/query/QueryBuilder";
import { DependencyCategory } from "./models/dependencies/DependencyCategory";

const externalModels = new QueryBuilder();
externalModels.add(DependencyCategory.CORE, /^(react|react-dom)$/);
externalModels.add(DependencyCategory.LIBRARY, /^(del|minimist|graphviz|express)$/);

export const externalClassify = new Classify(externalModels, true);

const internalModels = new QueryBuilder();
internalModels.add(DependencyCategory.APPLICATION, /^(website)$/);
internalModels.add(DependencyCategory.CORE, /^(core)$/);
internalModels.add(DependencyCategory.LIBRARY, /^(utils|reactx)$/);

export const internalClassify = new Classify(internalModels, true);
