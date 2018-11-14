---
title: Chain Core
---

# Chain Core

Chain CoreはUniqys Kitにおいて、ブロックチェーンの生成・管理を担当しているコンポーネントです。
[libp2p](https://github.com/libp2p)によってP2Pネットワークを構築し、全体で単一のブロックチェーンを共有します。

## コンセンサスアルゴリズム

UniqysのChain Coreでは、[Tendermint](https://tendermint.com/static/docs/tendermint.pdf)で用いられているPBFTをベースとしたコンセンサスアルゴリズムを採用しています。
PBFTを用いることで、安全かつ継続的にアプリケーションの状態遷移を複数マシン上に複製でき、ブロックチェーンのデータ、つまりアプリケーションの状態を分散して管理することを実現しています。

BitcoinやEthereumで採用されているProof of Workには、ゲームなどのアプリケーションに不可欠なファイナリティの欠如や、トランザクションに取り込まれるまでの時間が長いなど、DAppsを運用するには厳しい問題が多く残っていました。
ファイナリティを保証し、高いスループットを維持できるPBFTは、DAppsの管理に向いたコンセンサスアルゴリズムといえます。このような理由から、UniqysではTendermint PBFTが採用されました。
