declare module "package_json" {
  export interface PackageRepository {
    type: "git";
    url: string;
    directory?: string;
  }

  export interface PackageBugReport {
    email?: string;
    url?: string;
  }

  export interface PackageAuthor {
    name: string;
    email?: string;
    url?: string;
  }

  export interface PackagePublishConfig {
    access: "public" | "restricted";
  }

  export interface Package {
    name: string;
    version: string;
    private: boolean;
    description?: string;
    typedocMain?: string;
    main?: string;
    module?: string;
    browser?: string;
    types?: string;
    license?: string;
    homepage?: string;
    repository?: string | PackageRepository;
    bugs?: string | PackageBugReport;
    author?: string | PackageAuthor;
    publishConfig?: PackagePublishConfig;
    keywords?: string[];
    files?: string[];
    scripts?: Record<string, string>;
    dependencies?: { [name: string]: string };
    devDependencies?: { [name: string]: string };
    peerDependencies?: { [name: string]: string };

    /** custom key using in kcmono only */
    _generator?: { name: string; version: string };
    nx?: Record<string, unknown>;
  }

  export type OptionalPackage = Partial<Package>;
  export type ReadonlyPackage = Readonly<Package>;
  export type OptionalReadonlyPackage = Readonly<OptionalPackage>;
}
