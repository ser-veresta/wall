import tw from "tailwind-styled-components";
import styled from "styled-components";

export const Button = tw.button`
rounded-3xl 
bg-primary-dark 
md:py-2 
md:px-4
py-1
px-3 
capitalize 
tracking-tight
hover:brightness-125
active:brightness-90
transition-all
duration-200
ease-in-out
`;

export const IconButton = tw.button`
bg-primary-light 
bg-opacity-0 
rounded-[5px] 
hover:bg-opacity-30 
px-1 
py-1
`;

export const TextFieldContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0.75rem 0;

  & .field {
    width: 100%;
    border-bottom: 0.125rem solid;
    border-radius: 4px 4px 0 0;
    padding: 0.825rem 0 0.5rem 0.875rem;
  }

  & .field:hover {
    border-color: #b2ac87 !important;
  }

  & .field:focus {
    outline: none;
  }

  & span.label {
    position: absolute;
    top: -0.475rem;
    left: 0.875rem;
    opacity: ${(p) => (p.value ? "1" : "0")};
    transition: opacity 0.3s ease-in-out;
  }

  & span.placeholder {
    position: absolute;
    top: 1.829rem;
    left: 1.875rem;
    opacity: ${(p) => (p.value ? "0" : "1")};
    transition: opacity 0.3s ease-in-out;
  }

  & .field:hover ~ span.placeholder {
    color: #b2ac87;
  }

  & .field:focus ~ span.placeholder {
    opacity: 0;
  }

  & .field:focus ~ span.label {
    color: #b2ac87;
    opacity: 1;
  }
`;
