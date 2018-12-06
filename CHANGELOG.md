
# v7.2.0
* Support hashed email as input parameter #6

# v7.1.0
* Support `mp` (mystery-person)

# v5.0.0 -> v7.0.0
* Increase the version to follow Angular version

# v4.0.0
* Update dependencies and README

# v3.0.5
* Remove lodash-es lib - [bundlephobia](https://bundlephobia.com/result?p=ngx-gravatar@3.0.5) 

# v3.0.4
* Cherry-pick lodash methods to reduce the bundle size [bundlephobia](https://bundlephobia.com/result?p=ngx-gravatar@3.0.4) 

# v3.0.3
* Support hi-res screens [#1](https://github.com/t-ho/ngx-gravatar/issues/1)

# v3.0.0
* Upgrade to Angular 6
* BreakingChange: `GravatarDefaultConfig` => `GravatarConfig`
* BreakingChange: `FALLBACK_TYPES` => `FALLBACK`
* BreakingChange: `RATING_TYPES` => `RATING`
* BreakingChange: Rating types are now case sensitive

# v2.1.3
* BugFix: Avatar is fetched twice when initializing

# v2.1.1
* Support camelCase selector `ngxGravatar`

# v2.1.0
* Be able to set `backgroundColor` locally and globally
* Be able to set Gravatar `rating` (`g`, `pg`, `r`, `x`)
* BugFix: `ngx-gravatar` tried to load the invalid Gravatar over and over again, spamming the console when invalid Gravata fallback type is passed to `forRoot()` method.
* Remove `@type/lodash` package from dependencies

# v2.0.1
* Lint and following Angular style guide

# v2.0.0
* Gravatar directive for Angular 4 and above