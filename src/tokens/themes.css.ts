import { createTheme, globalStyle } from '@vanilla-extract/css';
import { vars, HUE_VAR, STATUS_HUE_VARS, STATUS_BASE_HUE } from './contract.css';

/**
 * 明度は役割に予約された固定値。
 * 色相（hue）だけが変数で、外から差し替えられる。
 *
 * 中立色にもわずかに彩度を乗せてある（0.008）。完全な無彩色より、
 * アクセントと同じ色相を薄く含んだ方が画面がまとまるため。
 */
const hue = `var(${HUE_VAR}, 265)`;
const neutralChroma = '0.008';
const brandChroma = '0.17';

const neutral = (lightness: string) => `oklch(${lightness} ${neutralChroma} ${hue})`;
const brandColor = (lightness: string, chroma = brandChroma) =>
  `oklch(${lightness} ${chroma} ${hue})`;

/**
 * 状態色は、ブランド色とは別の変数から色相を取る。
 * 変数が未設定なら慣習どおりの色相（赤27・黄70・緑150・青245）に落ちる。
 *
 * 彩度は4つとも共通の1値にしてある。色相ごとに彩度を手で調整すると、
 * 色相を実行時に動かしたときにその調整が意味を失うため。
 * 黄色系は色域の制約で指定どおりの彩度を出せないが、ブラウザ側が
 * 彩度を落として収めるので、明度＝コントラストの方は動かない。
 */
const statusHue = (name: keyof typeof STATUS_BASE_HUE) =>
  `var(${STATUS_HUE_VARS[name]}, ${STATUS_BASE_HUE[name]})`;

const statusColor = (name: keyof typeof STATUS_BASE_HUE, lightness: string, chroma: string) =>
  `oklch(${lightness} ${chroma} ${statusHue(name)})`;

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
const statusTokens = (lightness: string, chroma: string, subtleL: string, subtleC: string) => ({
  danger: statusColor('danger', lightness, chroma),
  dangerSubtle: statusColor('danger', subtleL, subtleC),
  warning: statusColor('warning', lightness, chroma),
  warningSubtle: statusColor('warning', subtleL, subtleC),
  success: statusColor('success', lightness, chroma),
  successSubtle: statusColor('success', subtleL, subtleC),
  info: statusColor('info', lightness, chroma),
  infoSubtle: statusColor('info', subtleL, subtleC),
});

/**
 * 320px〜1440px の間を線形に補間する clamp を作る。
 *
 * 中間項を `rem + vw` にしてあるのが肝。`vw` だけだと、ブラウザの文字サイズ設定を
 * 上げても文字が大きくならない画面ができる（ズームには効くが設定には効かない）。
 * rem の項を混ぜることで、どちらにも追従する。
 */
const MIN_VW = 320;
const MAX_VW = 1440;
const ROOT = 16;

const fluid = (minPx: number, maxPx: number) => {
  const slope = (maxPx - minPx) / (MAX_VW - MIN_VW);
  const vw = +(slope * 100).toFixed(4);
  const rem = +((minPx - slope * MIN_VW) / ROOT).toFixed(4);
  return `clamp(${(minPx / ROOT).toFixed(4)}rem, ${rem}rem + ${vw}vw, ${(maxPx / ROOT).toFixed(4)}rem)`;
};

/** 型と余白は配色によって変わらないので、ライト・ダークで同じものを使う */
const sizing = {
  text: {
    xs: fluid(12, 13),
    sm: fluid(14, 15),
    base: fluid(16, 17),
    lg: fluid(18, 21),
    xl: fluid(22, 27),
    '2xl': fluid(27, 35),
    '3xl': fluid(33, 45),
  },
  space: {
    '3xs': '0.125rem',
    '2xs': '0.25rem',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
};

export const lightTheme = createTheme(vars, {
  ...sizing,
  color: {
    bg: neutral('97%'),
    surface: neutral('100%'),
    border: neutral('88%'),
    textMuted: neutral('55%'),
    text: neutral('35%'),
    textStrong: neutral('20%'),

    brand: brandColor('55%'),
    brandHover: brandColor('45%'),
    onBrand: neutral('100%'),
    brandSubtle: brandColor('95%', '0.03'),

    ...statusTokens('45%', '0.15', '94%', '0.04'),
    onStatus: neutral('100%'),
  },
});

export const darkTheme = createTheme(vars, {
  ...sizing,
  color: {
    bg: neutral('15%'),
    surface: neutral('21%'),
    border: neutral('32%'),
    textMuted: neutral('62%'),
    text: neutral('85%'),
    textStrong: neutral('96%'),

    // ライトでは brand より暗い方がホバー、ダークでは明るい方がホバー。
    // 値の方向は逆だが「ホバーで目立つ」という関係は保たれている。
    //
    // 差はライトの 10 ポイントに対し、ダークは 15 ポイント取ってある。
    // 明るい領域同士の明度差は中間領域より知覚しにくく、同じ 10 ポイントでは
    // ホバーだと気づけなかったため（実機で 75/78/80/83% を比較して決定）。
    brand: brandColor('65%', '0.15'),
    brandHover: brandColor('80%', '0.15'),
    onBrand: neutral('15%'),
    brandSubtle: brandColor('28%', '0.05'),

    // ライトの 45% に対してダークは 72%。ブランドのホバーと同じ理屈で、
    // 明るい領域では同じ明度差でも差が見えにくいため、値は揃えていない。
    ...statusTokens('72%', '0.13', '27%', '0.05'),
    onStatus: neutral('15%'),
  },
});

globalStyle('html, body', {
  margin: 0,
  padding: 0,
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});
