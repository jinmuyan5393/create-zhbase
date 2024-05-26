# 开发

- npm run build，得到 `outfile.cjs`
- 在控制台中执行 `npm link`，就能在本地执行 `bin` 中设定的指令了
- 查看全局软连 `npm ls -g`
- 删除本项目的软连 `npm un create-base -g`

## git clone

```sh
git clone repoUrl
git clone -b <branch_name> repoUrl
```

## degit

[degit 文档](https://github.com/Rich-Harris/degit)

degit user/repo

```sh
degit github:user/repo
degit <git@github.com>:user/repo
degit <https://github.com/user/repo>
```

degit 某个分支

```sh
degit user/repo#dev       # branch
degit user/repo#v1.2.3    # release tag
degit user/repo#1234abcd  # commit hash
```

## 常用依赖包

- prompts (友好的交互提示库)
- inquirer (命令行库, 命令行交互)
- kolorist (颜色库)
- chalk (颜色库)
- commander@9.0.0 (命令行库, 解析用户的输入的命令参数)
- download-git-repo (下载远程仓库)
- ora (命令行进度条)
- figlet (艺术字)
