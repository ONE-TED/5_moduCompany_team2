import { useState, useEffect, useCallback } from 'react';

interface IUseToast {
  isShow: boolean;
  message: string;
  toast: (message: string) => void;
}

export default function useToast(timer = 3000): IUseToast {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsShow(false);
    }, timer);

    return () => clearTimeout(timerId);
  }, [message, isShow]);

  const toast = useCallback(
    (message: string) => {
      setMessage(message);
      setIsShow(true);
    },
    [isShow],
  );

  return {
    isShow,
    message,
    toast,
  };
}
