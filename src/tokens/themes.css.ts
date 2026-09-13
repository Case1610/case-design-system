import { createTheme, globalStyle } from '@vanilla-extract/css';
import { vars, HUE_VAR, STATUS_HUE_VARS, STATUS_NAMES, type StatusName } from './contract.css';
import spec from '../../public/tokens.json';

/**
 * 値は持たない。**数値の正本は `public/tokens.json`**（= 配信される `/tokens.json`）で、
 * このファイルはそれを `oklch()` と `clamp()` に組み立てるだけ。
 *
 * 分けた理由は、写しを持つ側（ポートフォリオサイト）が突き合わせられる形が要るため。
 * このファイルは vanilla-extract に依存しているので、外から読むことができない。
 * **機械が読める形の原本を、機械が読める場所に置く。**
 *
 * public/ に置いてあるのはビルド工程を挟まず `/tokens.json` として配信するため。
 * 生成物ではなく原本がそこにある、という点に注意（コピーではない）。
 */

const pct = (l: number) => `${l}%`;

/**
 * 明度は役割に予約された固定値。色相（hue）だけが変数で、外から差し替えられる。
 *
 * 中立色にもわずかに彩度を乗せてある（spec.chroma.neutral）。完全な無彩色より、
 * アクセントと同じ色相を薄く含んだ方が画面がまとまるため。
 */
const hue = `var(${HUE_VAR}, ${spec.hue.default})`;

/**
 * 状態色は、ブランド色とは別の変数から色相を取る。
 * 変数が未設定なら慣習どおりの色相（赤27・黄70・緑150・青245）に落ちる。
 *
 * 彩度は4つとも共通の1値にしてある。色相ごとに彩度を手で調整すると、
 * 色相を実行時に動かしたときにその調整が意味を失うため。
 * 黄色系は色域の制約で指定どおりの彩度を出せないが、ブラウザ側が
 * 彩度を落として収めるので、明度＝コントラストの方は動かない。
 */
const statusHue = (name: StatusName) =>
  `var(${STATUS_HUE_VARS[name]}, ${spec.statusHue[name]})`;

type Role = { on: 'neutral' | 'brand'; l: number; c?: number };

const roleColor = ({ on, l, c }: Role) =>
  `oklch(${pct(l)} ${c ?? (on === 'neutral' ? spec.chroma.neutral : spec.chroma.brand)} ${hue})`;

/**
 * 状態色の明度も、中立色と同じく役割に予約する。
 *
 * ライトは 45%（文字・枠線・塗り）と 94%（面）、ダークは 72% と 27%。
 * 全色相を走査して算出したコントラスト比の最小値は、
 * ライト 5.94:1（濃色を淡色面に乗せたとき）、ダーク 5.82:1 で、
 * どの色相を選んでも 4.5:1 を下回らない。
 *
 * ブランドの 55% / 65% とあえてずらしてある。状態色は文字として読ませるが、
 * ブランドは塗りの上に白文字を乗せる使い方が主で、要求が違う。
 */
const statusTokens = (s: { l: number; c: number; subtleL: number; subtleC: number }) =>
  Object.fromEntries(
    STATUS_NAMES.flatMap((name) => [
      [name, `oklch(${pct(s.l)} ${s.c} ${statusHue(name)})`],
      [`${name}Subtle`, `oklch(${pct(s.subtleL)} ${s.subtleC} ${statusHue(name)})`],
    ]),
  ) as Record<StatusName | `${StatusName}Subtle`, string>;

/**
 * 320px〜1440px の間を線形に補間する clamp を作る。
 *
 * 中間項を `rem + vw` にしてあるのが肝。`vw` だけだと、ブラウザの文字サイズ設定を
 * 上げても文字が大きくならない画面ができる（ズームには効くが設定には効かない）。
 * rem の項を混ぜることで、どちらにも追従する。
 */
const { minVw: MIN_VW, maxVw: MAX_VW, root: ROOT } = spec.fluid;

const fluid = ([minPx, maxPx]: readonly number[]) => {
  const slope = (maxPx - minPx) / (MAX_VW - MIN_VW);
  const vw = +(slope * 100).toFixed(4);
  const rem = +((minPx - slope * MIN_VW) / ROOT).toFixed(4);
  return `clamp(${(minPx / ROOT).toFixed(4)}rem, ${rem}rem + ${vw}vw, ${(maxPx / ROOT).toFixed(4)}rem)`;
};

/** 型と余白は配色によって変わらないので、ライト・ダークで同じものを使う */
const sizing = {
  text: Object.fromEntries(
    Object.entries(spec.text).map(([k, v]) => [k, fluid(v)]),
  ) as Record<keyof typeof spec.text, string>,
  space: spec.space,
};

const theme = (scheme: 'light' | 'dark') => {
  const { roles, status } = spec.color[scheme];
  return {
    ...sizing,
    color: {
      ...(Object.fromEntries(
        Object.entries(roles).map(([k, v]) => [k, roleColor(v as Role)]),
      ) as Record<keyof typeof roles, string>),
      ...statusTokens(status),
    },
  };
};

/**
 * ライトの textMuted は 55% ではなく 54%。55% だと bg（97%）に乗せたとき 4.41:1 で
 * AA を割る。明度を予約すればコントラストは計算で保証される、という前提が
 * 実測で破れていた1点（2026-09-12、docs/decisions.md）。
 *
 * ダークの brandHover は brand との差を15ポイント取ってある（ライトは10ポイント）。
 * 明るい領域同士の明度差は中間領域より知覚しにくく、同じ10ポイントでは
 * ホバーだと気づけなかったため（実機で 75/78/80/83% を比較して決定）。
 * 状態色の 45% / 72% も同じ理屈で、ライトとダークで値を揃えていない。
 */
export const lightTheme = createTheme(vars, theme('light'));
export const darkTheme = createTheme(vars, theme('dark'));

globalStyle('html, body', {
  margin: 0,
  padding: 0,
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});
