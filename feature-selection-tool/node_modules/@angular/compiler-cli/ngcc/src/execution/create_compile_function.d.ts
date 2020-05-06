/// <amd-module name="@angular/compiler-cli/ngcc/src/execution/create_compile_function" />
import { FileSystem } from '../../../src/ngtsc/file_system';
import { ParsedConfiguration } from '../../../src/perform_compile';
import { Logger } from '../logging/logger';
import { PathMappings } from '../ngcc_options';
import { PackageJsonUpdater } from '../writing/package_json_updater';
import { CreateCompileFn } from './api';
/**
 * The function for creating the `compile()` function.
 */
export declare function getCreateCompileFn(fileSystem: FileSystem, logger: Logger, pkgJsonUpdater: PackageJsonUpdater, createNewEntryPointFormats: boolean, errorOnFailedEntryPoint: boolean, enableI18nLegacyMessageIdFormat: boolean, tsConfig: ParsedConfiguration | null, pathMappings: PathMappings | undefined): CreateCompileFn;
