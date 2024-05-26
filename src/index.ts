#!/usr/bin/env node

import { existsSync, mkdirSync, rmdirSync, unlinkSync } from "node:fs";
import minimist from "minimist";
import prompts from "prompts";
import { join } from "node:path";
import { bold, red } from "kolorist";
import type { BaseTemplateList } from "./question/template/type";
import {
  printBanner,
  canSkipEmptying,
  ora,
  dowloadTemplate,
  printFinish,
  replaceProjectName,
} from "./utils";
import { question } from "./question";
import { templateList } from "./question/template/templateDate";
import filePrompt from "./question/file";
import { postOrderDirectoryTraverse } from "./utils/directoryTraverse";
console.log("===========init=======");
let loading;
async function init() {
  printBanner();

  // 获取用户参数
  const argv = minimist(process.argv.slice(2), {
    alias: {
      templateType: ["t"],
    },
    string: ["_"],
  });
  const projectName = argv._[0];

  let result: {
    projectName?: string;
    shouldOverwrite?: boolean;
    templateType?: BaseTemplateList["value"];
  } = {};

  if (!projectName) {
    try {
      result = await question();
      console.log(result);
    } catch (cancelled) {
      // eslint-disable-next-line no-console
      console.log((<{ message: string }>cancelled).message);
      process.exit(1);
    }
  } else {
    const templateType = templateList.find(
      (item) => item.value.type === argv?.t
    )?.value;

    if (!templateType && argv?.templateType) {
      // eslint-disable-next-line no-console
      console.log(`${bold(`未获取到${argv?.templateType}模板`)}`);
      process.exit(1);
    }

    const pp = async () => {
      const onCancel = () => {
        throw new Error(`${bold("操作已取消")}`);
      };
      // 如果存在相同目录是否覆盖
      const step1 = filePrompt(projectName);
      try {
        const step2 = await prompts(step1, { onCancel });
        return step2.shouldOverwrite;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(`${bold("操作已取消")}`);
        // 既然操作已经取消那就退出呀！
        process.exit(1);
      }
    };
    result = {
      projectName,
      shouldOverwrite: canSkipEmptying(projectName) ? true : await pp(),
      templateType: templateType || {
        type: "base",
        branch: "base",
        url: {
          gitee: "https://github.com/jinmuyan5393/zh-uni-base.git",
          github: "https://github.com/jinmuyan5393/zh-uni-base.git",
        },
      },
    };
  }

  loading = ora(`${bold("正在创建模板...")}`).start();
  const cwd = process.cwd();
  const root = join(cwd, result.projectName!);
  const packageManager = "pnpm";

  function emptyDir(dir: string) {
    if (!existsSync(dir)) return;

    postOrderDirectoryTraverse(
      dir,
      (dir) => rmdirSync(dir),
      (file) => unlinkSync(file)
    );
  }

  if (existsSync(root) && result.shouldOverwrite) emptyDir(root);
  else if (!existsSync(root)) mkdirSync(root);

  if (result.templateType!.type !== "custom") {
    const { templateType, projectName } = result;
    await dowloadTemplate(templateType!, projectName!, root, loading);
    printFinish(
      root,
      cwd,
      packageManager,
      loading,
      result.templateType!.type as any
    );
    return;
  }

  type Callback = (dataStore: Record<string, any>) => void;
  const callbacks: Callback[] = [];

  const dataStore: Record<string, any> = {};
  // Process callbacks
  for (const cb of callbacks) await cb(dataStore);

  replaceProjectName(root, result.projectName!);

  printFinish(root, cwd, packageManager, loading);
}

init();
