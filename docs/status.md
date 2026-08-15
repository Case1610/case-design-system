# 進捗状況

最終更新: 2026-08-16

## フェーズ

- [x] 設計原則の策定 — docs/principles.md
- [x] 技術スタックの決定 — React + React Aria / vanilla-extract（CLAUDE.md 参照）
- [ ] Design Tokens 設計 — 階層構造、命名規則、値
- [ ] 最初のコンポーネント実装
- [ ] ドキュメントサイト（Storybook）
- [ ] Figma 連携

## 直近の状態

原則1〜5、拠り所となる考え方（Form Follows Function / Divide and Conquer /
Begin with the End in Mind / Tailor to the Case）、原則衝突の裁定プロトコルまで確定。

原則1（密度）・3（API制約）・4（キーボード/a11y）は「視覚サイズと操作可能領域を分離する」
「自由の範囲はスタイルに限り、a11yの土台は強制的に内蔵する」というレイヤー分離で衝突を解消済み。
原則2（色は意味に予約）は compact モードのゼブラストライプのみ例外を許容
（根拠は docs/decisions.md）。

対象領域: 業務・管理画面系。主役コンポーネントは Table / Form / Filter / Combobox。

## 次のアクション

Design Tokens を設計する。原則1（密度モード）と原則3（vanilla-extract の `createTheme` で
型レベルに縛る）を前提に、トークンの階層構造（Primitive → Semantic → Component など）と
命名規則を決めるところから始める。
