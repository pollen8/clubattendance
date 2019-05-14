import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  MutableRefObject,
} from 'react';

export const useDropdown = (trigger: MutableRefObject<any>): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  useEffect(() => {
    const close = (e: any) => {
      if (!trigger.current) {
        return;
      }
      if (e && e.path && e.path.indexOf(trigger.current) !== -1) {
        return;
      }
      setDropdownVisible(false);
    };
    document.addEventListener('click', close);
    return () => {
      document.removeEventListener('click', close);
    };

  }, []);


  return [dropdownVisible, setDropdownVisible];
}