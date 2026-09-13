import { createThemeContract } from '@vanilla-extract/css';
import spec from '../../public/tokens.json';

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
  /**
   * 型（文字の大きさ）。ビューポート 320px〜1440px の間で連続的に変わる。
   *
   * **すべて rem を含む式で書く。** px で固定するとブラウザの文字サイズ設定に
   * 追従しなくなり、原則1（快適さを我々が決め打ちしない）が破れる。
   * vw だけで補間しても同じことが起きる（ズームには効くが文字サイズ設定には効かない）ため、
   * clamp の中間項は必ず `〇rem + 〇vw` の形にしてある。
   */
  text: {
    /** 注釈・キャプション */
    xs: null,
    /** 補助テキスト */
    sm: null,
    /** 本文 */
    base: null,
    /** 小見出し */
    lg: null,
    /** 見出し */
    xl: null,
    /** 大見出し */
    '2xl': null,
    /** ページタイトル */
    '3xl': null,
  },

  /**
   * 余白。型と違い、ビューポートでは変えない。
   *
   * 余白まで連続的に変えると、要素の間隔と文字の大きさが別々に動いて
   * 関係が読めなくなる。密度を変えたくなったら、ここを倍率で一括して動かす
   * （原則1の密度の軸。実装は未着手）。
   *
   * 値は rem。文字サイズ設定を上げた人には余白も一緒に広がってほしい。
   */
  space: {
    /** 隣接する要素の最小の隙間 */
    '3xs': null,
    '2xs': null,
    xs: null,
    sm: null,
    /** 既定 */
    md: null,
    lg: null,
    xl: null,
    /** 節と節の間 */
    '2xl': null,
  },

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

    /**
     * 状態色。ブランド色とは生成元を分けてある（原則2）。
     *
     * `〜` は文字・アイコン・枠線・塗りに使う濃い方。
     * `〜Subtle` はその状態の面（バナー・トーストの背景）。
     * ブランド色が brand / brandSubtle の2段で足りているのと同じ構造。
     */
    danger: null,
    dangerSubtle: null,
    warning: null,
    warningSubtle: null,
    success: null,
    successSubtle: null,
    info: null,
    infoSubtle: null,

    /**
     * 状態色を塗りに使ったとき、その上に乗る文字。
     *
     * 値はいま onBrand と同じだが、名前は分ける。
     * 同じ値であることは偶然であって、片方の明度を動かしたときに
     * もう片方まで一緒に動いてよい理由にはならない。
     */
    onStatus: null,
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

/**
 * 状態の種類。この4つより増やさない。
 *
 * 増やすほど「意味のある色」と「装飾」の区別が壊れやすくなる（原則2）。
 */
export const STATUS_NAMES = ['danger', 'warning', 'success', 'info'] as const;
export type StatusName = (typeof STATUS_NAMES)[number];

/**
 * 状態色の色相を外から差し替えるための CSS 変数名。
 *
 * ブランド色の HUE_VAR とは別に持つ。これが「生成元を分ける」（原則2）の実体で、
 * 変数が分かれているからこそ、状態色をブランドに追従させるか・固定するか・
 * ぶつかったときだけずらすかを、後から切り替えられる。
 */
export const STATUS_HUE_VARS: Record<StatusName, string> = spec.statusHueVar;

/**
 * 状態色の既定の色相。変数が未設定ならこの値が使われる。
 *
 * 「赤は危険」「緑は成功」は学習された慣習であって、計算で導ける値ではない。
 * だからここは根拠を数式ではなく慣習に置いている。
 */
export const STATUS_BASE_HUE: Record<StatusName, number> = spec.statusHue;
