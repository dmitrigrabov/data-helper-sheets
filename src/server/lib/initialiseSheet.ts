import { addSheet } from '../sheets';
import format from '../format';

export const initialiseSheet = () => {
  Object.keys(format).forEach((tabName) => {
    addSheet(tabName);
  });
};
