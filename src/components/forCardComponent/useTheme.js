import { useContext } from 'react';
import { ThemeContext } from '../../layout/LayoutComponent';

export const useTheme = () => {
  return useContext(ThemeContext);
};
