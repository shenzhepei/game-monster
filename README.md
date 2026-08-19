# Monster Field

<!-- repo-languages:start -->
English | [简体中文](README-zh-CN.md)
<!-- repo-languages:end -->

<!-- repo-badges:start -->
[![Node.js 24](https://img.shields.io/badge/Node.js-24-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![pnpm 10.33.2](https://img.shields.io/badge/pnpm-10.33.2-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io)
[![React 18.3.1](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite 8.2.1](https://img.shields.io/badge/Vite-8.2.1-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![TypeScript 5.9.3](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Sass 1.102.0](https://img.shields.io/badge/Sass-1.102.0-CC6699?style=flat-square&logo=sass&logoColor=white)](https://sass-lang.com)
[![Test Coverage](https://img.shields.io/codecov/c/github/shenzhepei/game-monster?style=flat-square&logo=codecov)](https://codecov.io/gh/shenzhepei/game-monster)
[![License](https://img.shields.io/github/license/shenzhepei/game-monster?style=flat-square)](https://github.com/shenzhepei/game-monster/blob/HEAD/LICENSE)
[![Sponsor](https://img.shields.io/github/sponsors/shenzhepei?style=flat-square&logo=githubsponsors&label=Sponsor)](https://github.com/sponsors/shenzhepei)
<!-- repo-badges:end -->

A compact survival game built with React and Phaser. Explore a pixel-art field, fight roaming monsters, gain experience, level up, and keep progress in a local save.

[Play Monster Field](https://shenzhepei.github.io/game-monster/)

![Monster Field showing the live arena and player HUD](docs/preview.jpg)

## Features

- Phaser-powered movement, animation, collision, and monster pursuit
- Keyboard and touch movement with a short-range strike
- Health, experience, level, gold, and defeat progression
- Local manual saves and a resettable run
- Original pixel character and monster artwork from the earlier project
- Responsive English and Simplified Chinese interface

## Development

Requires Node.js 24 and pnpm 10.33.2.

    corepack enable
    pnpm install
    pnpm dev

Run production and test checks with:

    pnpm build
    pnpm test:coverage

## License

MIT. The original 2020 copyright notice is preserved in [LICENSE](LICENSE).
