export enum DependencyCategory {
  /**
   * End user application.
   *
   * This usually use core application to implement and might use some libraries
   *
   */
  APPLICATION = "application",
  /**
   * core application
   *
   * This usually use libraries to implement
   */
  CORE = "core",
  /**
   * raw library. it will implement as widely use for multiple core or application
   * usually it will implement base on single responsability only.
   */
  LIBRARY = "library",

  /**
   * internal application for run internally or internal library for internal package
   *
   * usually this is project with @internal scope
   */
  INTERNAL = "internal",

  /**
   * custom typescript definition
   *
   * usually this is project with @types scope
   */
  TYPE = "type",

  /**
   * ignore package will never add to final graph
   */
  IGNORE = "ignore",

  /**
   * this is only for fallback. this will be ignore if type is external
   */
  UNKNOWN = "unknown",
}
