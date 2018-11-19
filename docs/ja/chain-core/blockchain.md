---
title: ブロックチェーン
---

# ブロックチェーン

## データ構造

Chain Coreの生成するブロックチェーンの各ブロックのヘッダには以下のデータを保持しています。

- **height**: ブロックの高さ
- **timestamp**: ブロックが生成された時間のタイムスタンプ
- **lastBlockHash**: 前ブロックのハッシュ値
- **transactionRoot**: トランザクションのマークルルート
- **lastBlockConsensusRoot**: 前ブロックのコンセンサスのマークルルート
- **nextValidatorSetRoot**: 次ブロックのバリデータセットのマークルルート
- **appStateHash**: アプリケーションの状態

## 前後のブロックの関係

Chain Coreのブロックチェーンでは、前後のブロックの関係により、あるトランザクションは含められたブロックの2つ先のブロックで、その実行結果が保証されます。

高さNのブロックをブロック(N)と表記します。

### トランザクション

#### ブロック(N)

このブロックに含められたトランザクションは、ブロックの承認後にアプリケーションへリクエストとして送信されます。

#### ブロック(N+1)

ブロック(N)で承認されたトランザクションがアプリケーション上で実行され、このブロックの`appState`（アプリケーションの状態）として取り込まれます。

### コンセンサス

#### ブロック(N)

ブロック(N)のコンセンサスは、NにおけるバリデータセットによってTendermintアルゴリズムが実行され、バリデータセット全体の投票力の2/3よりも多くの投票力を持つ署名が集まるとコンセンサスに至ります。
ただし、このブロック(N)にはこの署名の集合は含まれません。
これは、署名の集合自体をコンセンサスの対象となるブロックの中身に含めることができるようにするためです。
署名は2/3よりも多く投票力があれば異なる集合でも正しいコンセンサスの証拠となりますが、コンセンサスの対象に含めることで同一の集合に合意を得ることができます。

#### ブロック(N+1)

ブロック(N+1)は、一つ前のブロック(N)の署名の集合である`lastBlockConsensus`が含まれます。
このブロック(N+1)のコンセンサスが得られると、ブロック(N)の署名の集合が同一のものに合意が取れたことになります。

:::tip ポイント
あるブロックは次のブロックの`lastBlockConsensus`でコンセンサスが含められることによってファイナリティを得られるといえます。
つまり、ブロック(N-1)で含められたトランザクションは、その実行結果がブロック(N)でブロックに含められ、ブロック(N+1)で実行結果が保証されるということになります。
:::

### バリデータ

#### ブロック(N)

ブロックデータの`nextValidatorSet`により、ブロック(N)はブロック(N+1)のバリデータセットを保持します。
これは、バリデータセットを変更可能にするためです。

#### ブロック(N+1)

ブロック(N+1)のコンセンサスを得る際は、ブロック(N)の`nextValidatorSet`のノードからの署名が集められます。