import styled from 'styled-components';

export const LoadMoreBtn = styled.button`
  padding: 8px 16px;
  border-radius: 25px;
  background-color: #0735e2;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  margin: 0 auto;
  color: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  min-width: 180px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &:hover,
  &:focus {
    background-color: #075ee2;
  }
`;

export const BtnWrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
`;
