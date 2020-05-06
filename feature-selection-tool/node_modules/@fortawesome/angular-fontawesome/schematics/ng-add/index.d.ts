import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';
import { Rule } from '@angular-devkit/schematics';
import { Schema } from './schema';
export default function (options: Schema): Rule;
export declare function getProjectTargetOptions(project: WorkspaceProject, buildTarget: string): any;
