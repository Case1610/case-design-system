import { lightTheme, darkTheme } from '../tokens/themes.css';
import type { ResolvedColorScheme } from './useColorScheme';

export { useColorScheme } from './useColorScheme';
export type {
  ColorSchemePreference,
  ResolvedColorScheme,
  ColorSchemeState,
} from './useColorScheme';

/**
 * 解決済みの配色に対応するクラス名を返す。
 *
 * 利用側に lightTheme / darkTheme を両方 import させないためのもの。
 * テーマが増えたときに変わるのはここだけになる。
 */
export function themeClass(scheme: ResolvedColorScheme): string {
  return scheme === 'dark' ? darkTheme : lightTheme;
}
