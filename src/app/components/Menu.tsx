import { Card } from 'fab-ui';
import React, {
  FC,
  useRef,
} from 'react';
import { IoMdMenu } from 'react-icons/io';
import {
  Manager,
  Popper,
  Reference,
} from 'react-popper';
import styled from 'styled-components';
import { useMedia } from 'use-media';

import { useDropdown } from '../hooks/dropdown';
import { MenuLinks } from './MenuLinks';

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


export const Menu: FC<{}> = () => {
  const circleRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useDropdown(circleRef);
  const isWide = useMedia('(min-width: 1000px)');
  return (
    <>
      {
        !isWide &&
        <Burger ref={circleRef}>
          <Manager>
            <Reference>
              {({ ref }) => (
                <a href="#"
                  ref={ref}
                  onClick={() => {
                    setDropdownVisible(!dropdownVisible);
                  }}>
                  <IoMdMenu size="2rem" />
                </a>
              )}
            </Reference>
            <Popper placement="bottom-start"
            >
              {({ ref, style, placement, arrowProps }) => {
                return <Card ref={ref}
                  style={{
                    ...style,
                    opacity: 1,
                    display: dropdownVisible ? 'block' : 'none',
                    zIndex: 100,
                  }}
                  data-placement={placement}>
                  <Wrapper
                    collapsed={true}>
                    <MenuLinks onClick={() => setDropdownVisible(!dropdownVisible)} />
                  </Wrapper>
                </Card>;
              }
              }
            </Popper>
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

