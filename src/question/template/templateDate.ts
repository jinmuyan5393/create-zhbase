import { green, red } from "kolorist";
import type { TemplateList } from "./type";

export const templateList: TemplateList[] = [
  {
    title: `base${green("(推荐)")}`,
    description: `${red("(多TAB base项目)")}`,
    value: {
      type: "base",
      branch: "main",
      url: {
        gitee: "https://github.com/jinmuyan5393/zh-uni-base.git",
        github: "https://github.com/jinmuyan5393/zh-uni-base.git",
      },
    },
  },
  {
    title: `uni-demo${green("(演示项目)")}`,
    description: `${red("(多TAB演示项目)")}`,
    value: {
      type: "uni-demo",
      branch: "demo",
      url: {
        gitee: "https://github.com/jinmuyan5393/zh-uni-base.git",
        github: "https://github.com/jinmuyan5393/zh-uni-base.git",
      },
    },
  },
  {
    title: `admin-base${green("(管理后台)")}`,
    description: `${red("(管理后台基础模板)")}`,
    value: {
      type: "admin-base",
      branch: "admin-base",
      url: {
        gitee: "https://github.com/jinmuyan5393/zh-uni-base.git",
        github: "https://github.com/jinmuyan5393/zh-uni-base.git",
      },
    },
  },
];
