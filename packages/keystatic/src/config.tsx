import { ColorScheme } from '@keystar/ui/types';
import { ReactElement } from 'react';

import { ComponentSchema, FormField, SlugFormField } from './form/api';
import type { Locale } from './app/l10n/locales';
import { RepoConfig } from './app/repo-config';

// Common
// ----------------------------------------------------------------------------

export type DataFormat = 'json' | 'yaml';
export type Format =
  | DataFormat
  | {
      data?: DataFormat;
      contentField?: string | [string, ...string[]];
    };
export type EntryLayout = 'content' | 'form';
export type Glob = '*' | '**';

export type SortDirection = 'ascending' | 'descending';
export type DefaultSort<Schema extends Record<string, ComponentSchema>> = {
  column: (keyof Schema & string) | 'slug' | 'status';
  direction?: SortDirection;
};

type CustomPageRenderArgs<Collections, Singletons, Pages> = {
  basePath: string;
  config: Config<Collections, Singletons, Pages>;
};

export type CustomPage<Collections, Singletons, Pages> = {
  label: string;
  icon?: ReactElement;
  description?: string;
  render: (args: CustomPageRenderArgs<Collections, Singletons, Pages>) => ReactElement;
};

type CustomPageMap<Collections, Singletons, Pages> = Record<
  string,
  CustomPage<Collections, Singletons, Pages>
>;

export type Collection<
  Schema extends Record<string, ComponentSchema>,
  SlugField extends string,
> = {
  label: string;
  path?: `${string}/${Glob}` | `${string}/${Glob}/${string}`;
  entryLayout?: EntryLayout;
  format?: Format;
  previewUrl?: string;
  columns?: string[];
  defaultSort?: DefaultSort<Schema>;
  template?: string;
  parseSlugForSort?: (slug: string) => string | number;
  slugField: SlugField;
  schema: Schema;
};

export type Singleton<Schema extends Record<string, ComponentSchema>> = {
  label: string;
  path?: string;
  entryLayout?: EntryLayout;
  format?: Format;
  previewUrl?: string;
  schema: Schema;
};

type CommonConfig<Collections, Singletons, Pages> = {
  locale?: Locale;
  cloud?: { project: string };
  ui?: UserInterface<Collections, Singletons, Pages>;
};

type CommonRemoteStorageConfig = {
  pathPrefix?: string;
  branchPrefix?: string;
};

// Interface
// ----------------------------------------------------------------------------

type BrandMark = (props: {
  colorScheme: Exclude<ColorScheme, 'auto'>; // we resolve "auto" to "light" or "dark" on the client
}) => ReactElement;
export const NAVIGATION_DIVIDER_KEY = '---';
type UserInterface<Collections, Singletons, Pages> = {
  brand?: {
    mark?: BrandMark;
    name: string;
  };
  navigation?: Navigation<
    | (keyof Collections & string)
    | (keyof Singletons & string)
    | (keyof Pages & string)
    | typeof NAVIGATION_DIVIDER_KEY
  >;
  pages?: Pages;
};

type Navigation<K> = K[] | { [section: string]: K[] };

// Storage
// ----------------------------------------------------------------------------

type GitHubStorageConfig = {
  kind: 'github';
  repo: RepoConfig;
} & CommonRemoteStorageConfig;

export type GitHubConfig<
  Collections extends {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  } = {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  },
  Singletons extends {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  } = {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  },
  Pages extends CustomPageMap<Collections, Singletons, Pages> = {}
> = {
  storage: GitHubStorageConfig;
  collections?: Collections;
  singletons?: Singletons;
} & CommonConfig<Collections, Singletons, Pages>;

type LocalStorageConfig = { kind: 'local' };

export type LocalConfig<
  Collections extends {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  } = {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  },
  Singletons extends {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  } = {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  },
  Pages extends CustomPageMap<Collections, Singletons, Pages> = {}
> = {
  storage: LocalStorageConfig;
  collections?: Collections;
  singletons?: Singletons;
} & CommonConfig<Collections, Singletons, Pages>;

type CloudStorageConfig = { kind: 'cloud' } & CommonRemoteStorageConfig;

export type CloudConfig<
  Collections extends {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  } = {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  },
  Singletons extends {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  } = {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  },
  Pages extends CustomPageMap<Collections, Singletons, Pages> = {}
> = {
  storage: CloudStorageConfig;
  cloud: { project: string };
  collections?: Collections;
  singletons?: Singletons;
} & CommonConfig<Collections, Singletons, Pages>;

export type Config<
  Collections extends {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  } = {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  },
  Singletons extends {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  } = {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  },
  Pages extends CustomPageMap<Collections, Singletons, Pages> = {}
> = {
  storage: LocalStorageConfig | GitHubStorageConfig | CloudStorageConfig;
  collections?: Collections;
  singletons?: Singletons;
} & ({} extends Collections ? {} : { collections: Collections }) &
  ({} extends Singletons ? {} : { singletons: Singletons }) &
  CommonConfig<Collections, Singletons, Pages>;

// ============================================================================
// Functions
// ============================================================================

export function config<
  Collections extends {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  },
  Singletons extends {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  },
  Pages extends CustomPageMap<Collections, Singletons, Pages> = {}
>(config: Config<Collections, Singletons, Pages>) {
  return config;
}

export function collection<
  Schema extends Record<string, ComponentSchema>,
  SlugField extends {
    [K in keyof Schema]: Schema[K] extends SlugFormField<any, any, any, any>
      ? K
      : never;
  }[keyof Schema],
>(
  collection: Collection<Schema, SlugField & string> & {
    columns?: {
      [K in keyof Schema]: Schema[K] extends
        | FormField<
            any,
            any,
            string | number | boolean | Date | null | undefined
          >
        | SlugFormField<any, any, any, string>
        ? K & string
        : never;
    }[keyof Schema][];
  }
): Collection<Schema, SlugField & string> {
  return collection;
}

export function singleton<Schema extends Record<string, ComponentSchema>>(
  collection: Singleton<Schema>
): Singleton<Schema> {
  return collection;
}
