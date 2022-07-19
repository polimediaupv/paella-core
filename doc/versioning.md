# Versioning in paella-core and plugins

The versioning system for `paella-core` and the rest of the plug-in libraries maintained by the Universidad Politécnica de Valencia has been designed to simplify the maintenance of the plug-in repositories, and to maximize the compatibility between them and the core library.


## Major version

A change in the major version number implies that there are incompatibilities in the API. Thus, if in the future you move from the current `1.x.x` version to a `2.x.x` version, the plugin libraries must conicidence on the major version number: that is, to work with `paella-core` `2.x.x`, a plugin library must be at least version `2.x.x`.

## Minor version

A change in the minor version number implies that new APIs have been added. The minor version of a plugin library must be less than or equal to the core library. For example, a plugin versioned as `1.0.4` will work without problems with `paella-core` versions `1.0.x`, `1.1.x`, `1.2.x` and in general with any `paella-core` version whose major version matches the plugin version. The reason for this is that the minor version of the plugin is used to determine which version of the `paella-core` API it needs to run.

So, if we have a plugin library with version `1.2.x` it means that it is using `paella-core` `1.2.x` APIs, so these plugins will not work with a `paella-core` version earlier than `1.2.x`.

Let's see this with an example. In version `1.2.0` of `paella-core` a feature was added that allows you to modify the icons of button type plugins to customize them. For this feature to work, plugins must implement it, and therefore must make use of these new APIs. In implementing support for this feature, the `paella-basic-plugins` library was moved from `1.0.16` directly to `1.2.0`: in this case `1.1.x` has been skipped because there is no feature in `1.1.x` version `paella-core` that was needed for `paella-basic-plugins`.

## Revision

The last number of the version string is modified only for bug fixes or to implement features in `paella-core` that do NOT add new APIs.

## Summary

When using `paella-core` with the plugin libraries maintained by the Universidad Politécnica de Valencia, the recommendation is always to use the latest possible version. However, during the development life cycle it may happen that we want to update only some of the libraries. In this case, as long as the plugin libraries have the same major version and a minor version less than or equal to the `paella-core` library, your player should work correctly.

However, since backwards compatibility of `paella-core` is maintained, under normal circumstances, minor version updates older than the latest version will not be patched. For example, if a bug is detected in `1.0.35` of `paella-core` and the latest available version is `1.2.1`, the bug will be fixed in `1.2.2`, but a `1.0.36` version will not be created in parallel unless there is some important reason to do so.

For all of the above, the recommendation is to always update `paella-core` to the latest available minor version.
