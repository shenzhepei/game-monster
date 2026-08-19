# 怪物原野

<!-- repo-languages:start -->
[English](README.md) | 简体中文
<!-- repo-languages:end -->

<!-- repo-badges:start -->
[![Node.js 24](https://img.shields.io/badge/Node.js-24-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![pnpm 10.33.2](https://img.shields.io/badge/pnpm-10.33.2-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io)
[![React 18.3.1](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite 6.0.5](https://img.shields.io/badge/Vite-6.0.5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![TypeScript 5.7.2](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Sass 1.83.0](https://img.shields.io/badge/Sass-1.83.0-CC6699?style=flat-square&logo=sass&logoColor=white)](https://sass-lang.com)
[![Test Coverage](https://img.shields.io/codecov/c/github/shenzhepei/game-monster?style=flat-square&logo=codecov)](https://codecov.io/gh/shenzhepei/game-monster)
[![License](https://img.shields.io/github/license/shenzhepei/game-monster?style=flat-square)](https://github.com/shenzhepei/game-monster/blob/HEAD/LICENSE)
[![Sponsor](https://img.shields.io/github/sponsors/shenzhepei?style=flat-square&logo=githubsponsors&label=Sponsor)](https://github.com/sponsors/shenzhepei)
<!-- repo-badges:end -->

一款使用 React 与 Phaser 构建的轻量生存游戏。在像素原野中探索、对抗游荡的怪物、获得经验并升级，还可以将进度保存在本地。

[开始游戏](https://shenzhepei.github.io/game-monster/)

![怪物原野展示实时战斗场景与玩家状态面板](docs/preview.jpg)

## 功能

- 使用 Phaser 实现移动、动画、碰撞与怪物追踪
- 支持键盘和触控移动，以及近距离攻击
- 完整的生命、经验、等级、金币与击败数量成长
- 本地手动存档，并可随时开始新的冒险
- 保留早期项目中的原创像素角色与怪物素材
- 完整适配桌面和移动端的中英文界面

## 本地开发

需要 Node.js 24 和 pnpm 10.33.2。

    corepack enable
    pnpm install
    pnpm dev

运行生产构建与测试：

    pnpm build
    pnpm test:coverage

## 许可证

MIT。原项目 2020 年的版权声明保留在 [LICENSE](LICENSE) 中。
