import {useCallback} from 'react';

export const useAlert = () => {

  return useCallback(textAlert => {
    if (window.M && textAlert) {
      window.M.toast({html: textAlert});
    }
  }, []);
};