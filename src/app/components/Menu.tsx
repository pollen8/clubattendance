
import React, {
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { IoMdMenu } from 'react-icons/io';
import {
  Manager,
  Popper,
  Reference,
} from 'react-popper';
import styled from 'styled-components';
import { useMedia } from 'use-media';

import Button from '@bit/pollen8.fab-ui.button';
import Card from '@bit/pollen8.fab-ui.card';

import { auth } from '../../fire';
import { MenuLinks } from './MenuLinks';

const useClickOutside = (ref: any, callback: any) => {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

const Wrapper = styled.ul<{ collapsed?: boolean }>`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: ${({ collapsed }) => collapsed ? 'column' : 'row'};
  list-style: none;

  li {
    padding: ${({ collapsed }) => collapsed ? ' 0' : ' 0 1rem 0 0'};
    line-height: ${({ collapsed }) => collapsed ? '2.7rem' : '4.7rem'};

    a {
      color: ${(props) => props.theme.grey500};
      text-decoration: none;
      padding: ${({ collapsed }) => collapsed ? ' 0 1rem' : '0'};
      border-${({ collapsed }) => collapsed ? 'left' : 'bottom'}: 2px solid transparent;
      display: block;
      height: 100%;
    }

    a.active {
      border-${({ collapsed }) => collapsed ? 'left' : 'bottom'}: 2px solid ${({ theme }) => theme.primary500};
      color: ${({ theme }) => theme.primary500};
    }
    a:focus,
    a:hover {
      outline: 0;
      border-${({ collapsed }) => collapsed ? 'left' : 'bottom'}: 2px solid ${({ theme }) => theme.primary400};
      color: ${({ theme }) => theme.primary400};
    }
  }
`;

const Burger = styled.div`
  position: relative;
  text-align: right;
  width: 6rem;
`;


export const Menu = () => {
  const circleRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  useClickOutside(circleRef, () => setDropdownVisible(false));
  const isWide = useMedia('(min-width: 1000px)');
  return (
    <>
      {
        !isWide &&
        <Burger ref={circleRef}>
          <Manager>
            <Reference>
              {({ ref }) => (
                <Button
                  outline
                  ref={ref}
                  onClick={() => {
                    setDropdownVisible(!dropdownVisible);
                  }}>
                  <IoMdMenu size="2rem" />
                </Button>
              )}
            </Reference>
            {createPortal(
              <Popper placement="left"
              >
                {({ ref, style, placement, arrowProps }) => {
                  return <Card ref={ref}
                    style={{
                      ...style,
                      opacity: dropdownVisible ? 1 : 0,
                      zIndex: 100,
                    }}
                    data-placement={placement}>
                    <Wrapper
                      collapsed={true}>
                      <MenuLinks onClick={() => setDropdownVisible(!dropdownVisible)} />
                      <li>
                        <Button
                          outline
                          onClick={() => auth.signOut()}>logout
                        </Button>
                      </li>
                    </Wrapper>
                  </Card>;
                }
                }
              </Popper>,
              document.querySelector('#destination') as Element,
            )}

          </Manager>
        </Burger>
      }
      {
        isWide &&
        <Wrapper>
          <MenuLinks />
        </Wrapper>
      }
    </>)
};

