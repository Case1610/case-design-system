import { createTheme, globalStyle } from '@vanilla-extract/css';
import { vars, HUE_VAR } from './contract.css';

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

export const lightTheme = createTheme(vars, {
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
  },
});

export const darkTheme = createTheme(vars, {
  color: {
    bg: neutral('15%'),
    surface: neutral('21%'),
    border: neutral('32%'),
    textMuted: neutral('62%'),
    text: neutral('85%'),
    textStrong: neutral('96%'),

    // ライトでは brand より暗い方がホバー、ダークでは明るい方がホバー。
    // 値の方向は逆だが「ホバーで目立つ」という関係は保たれている。
    brand: brandColor('65%', '0.15'),
    brandHover: brandColor('75%', '0.15'),
    onBrand: neutral('15%'),
    brandSubtle: brandColor('28%', '0.05'),
  },
});

globalStyle('html, body', {
  margin: 0,
  padding: 0,
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});
