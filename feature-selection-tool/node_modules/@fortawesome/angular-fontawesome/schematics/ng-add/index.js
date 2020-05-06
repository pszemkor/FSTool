"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const typescript_1 = require("@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const change_1 = require("@schematics/angular/utility/change");
const config_1 = require("@schematics/angular/utility/config");
const dependencies_1 = require("@schematics/angular/utility/dependencies");
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
const versions_1 = require("./versions");
function default_1(options) {
    return schematics_1.chain([
        (tree, context) => {
            dependencies_1.addPackageJsonDependency(tree, {
                type: dependencies_1.NodeDependencyType.Default,
                name: '@fortawesome/fontawesome-svg-core',
                version: versions_1.svgCoreVersion,
            });
            dependencies_1.addPackageJsonDependency(tree, {
                type: dependencies_1.NodeDependencyType.Default,
                name: '@fortawesome/angular-fontawesome',
                version: versions_1.angularFontawesomeVersion,
            });
            const iconPackages = options.iconPackages != null ? options.iconPackages : ['free-solid'];
            for (const pack of iconPackages) {
                dependencies_1.addPackageJsonDependency(tree, {
                    type: dependencies_1.NodeDependencyType.Default,
                    name: `@fortawesome/${pack}-svg-icons`,
                    version: versions_1.iconPackVersion,
                });
            }
            context.addTask(new tasks_1.NodePackageInstallTask());
            return tree;
        },
        addModule(options.project),
    ]);
}
exports.default = default_1;
function addModule(projectName) {
    return (host, context) => {
        const workspace = config_1.getWorkspace(host);
        const project = workspace.projects[projectName || workspace.defaultProject];
        const buildOptions = getProjectTargetOptions(project, 'build');
        const modulePath = ng_ast_utils_1.getAppModulePath(host, buildOptions.main);
        const moduleSource = getSourceFile(host, modulePath);
        const changes = ast_utils_1.addImportToModule(moduleSource, modulePath, 'FontAwesomeModule', '@fortawesome/angular-fontawesome');
        const recorder = host.beginUpdate(modulePath);
        changes.forEach((change) => {
            if (change instanceof change_1.InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        });
        host.commitUpdate(recorder);
        context.addTask(new tasks_1.TslintFixTask(modulePath, {}));
        return host;
    };
}
function getSourceFile(host, path) {
    const buffer = host.read(path);
    if (!buffer) {
        throw new schematics_1.SchematicsException(`Could not find ${path}.`);
    }
    const content = buffer.toString('utf-8');
    return typescript_1.createSourceFile(path, content, typescript_1.ScriptTarget.Latest, true);
}
function getProjectTargetOptions(project, buildTarget) {
    if (project.targets && project.targets[buildTarget] && project.targets[buildTarget].options) {
        return project.targets[buildTarget].options;
    }
    if (project.architect && project.architect[buildTarget] && project.architect[buildTarget].options) {
        return project.architect[buildTarget].options;
    }
    throw new schematics_1.SchematicsException(`Cannot determine project target configuration for: ${buildTarget}.`);
}
exports.getProjectTargetOptions = getProjectTargetOptions;
//# sourceMappingURL=index.js.map