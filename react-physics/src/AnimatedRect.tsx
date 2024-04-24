import { useState, useRef, useEffect, MutableRefObject } from 'react';
import styled from 'styled-components';

export const Rect = styled.rect`
  fill: red;
  width: 100px;
  height: 100px;
  transform-box: view-box;
`;

interface AnimatedRectProps extends React.HTMLAttributes<SVGRectElement> {
    boxXRef: MutableRefObject<number>;
  }

export function AnimatedRect({ boxXRef, ...rest }: AnimatedRectProps) {
  const animationRef = useRef<number>();
  const boxRef = useRef<SVGRectElement | null>(null);
  const [boxX, setBoxX] = useState<number>(0);

    useEffect(() => {
    const animate = () => {
        setBoxX(boxRef.current!.getBoundingClientRect().left)
        animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    }, []);
    useEffect(() =>
    {
        boxXRef.current = boxX
    }, [boxX, boxXRef])
    
    return (<Rect ref={boxRef} {...rest} />);
}
