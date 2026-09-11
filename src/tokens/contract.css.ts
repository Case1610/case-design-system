import { createThemeContract } from '@vanilla-extract/css';

/**
 * トークンの契約（型のみ。値は持たない）。
 *
 * ここに無い値はコンポーネントから参照できない。
 * 「あと 2px だけ」のような調整は型エラーになり、トークンを増やす議論をするか
 * 諦めるかの二択になる（原則3）。
 *
 * 明度は役割に予約されている。役割名だけを公開し、明度そのものは見せない。
 * ライト／ダークで名前は共通、値だけ差し替える（原則1）。
 */
export const vars = createThemeContract({
  color: {
    /** ページ背景 */
    bg: null,
    /** カード・パネル。bg から浮く面 */
    surface: null,
    /** 枠線・区切り線。無効状態の背景にも使う */
    border: null,
    /** 補助テキスト・日付。無効状態の文字にも使う */
    textMuted: null,
    /** 本文 */
    text: null,
    /** 見出し */
    textStrong: null,

    /** アクセント。色相は --ds-hue で差し替えられる */
    brand: null,
    /** アクセントのホバー。ライトでは暗く、ダークでは明るくなる */
    brandHover: null,
    /** アクセントを背景に敷いたとき、その上に乗る文字 */
    onBrand: null,
    /** アクセントの淡い面。タグ・ラベルの背景 */
    brandSubtle: null,
  },
});

/**
 * 色相を外から差し替えるための CSS 変数名。
 *
 * これを書き換えると、brand 系の色がまとめて追従する。
 * 明度は役割ごとに固定されているため、色相が変わっても読みやすさは動かない
 * （原則1「快適さを我々が決め打ちしない」の、色における現れ方）。
 */
export const HUE_VAR = '--ds-hue';
