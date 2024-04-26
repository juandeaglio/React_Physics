import { useState, useRef, useEffect, MutableRefObject, useCallback } from 'react';
import styled from 'styled-components';

export const Rect = styled.rect`
  fill: red;
  width: 100px;
  height: 100px;
  transform-box: view-box;
`;

interface AnimatedRectProps extends React.HTMLAttributes<SVGRectElement> {
    numElementsRef: MutableRefObject<number>;
  }

export function AnimatedRect({ numElementsRef, ...rest }: AnimatedRectProps) {
    const animationRef = useRef<number>();
    const boxRef = useRef<SVGRectElement | null>(null);
    const boxXCurrRef = useRef<number>();
    const [boxX, setBoxX] = useState<number>(0);
    const [boxXLoaded, setBoxXLoaded] = useState<boolean>(false);
    const boxAnimRef = useRef<Animation | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const numElements: number = numElementsRef.current;
    console.log(numElements); // delete

    const newAnimation = useCallback(() => {
        return null;
        const svgX = svgRef.current!.getBoundingClientRect().left;
        const relativePos = boxXCurrRef.current! - svgX;
        console.log(`boxX: ${relativePos}, svgX: ${svgX}`)

        if (boxAnimRef.current)
        {
            boxAnimRef.current!.cancel();
        }

        boxAnimRef.current = boxRef.current!.animate([
        {
            transform: `translateX(${relativePos}px)`
        },
        {
            transform: `translateX(${relativePos+ 100}px)`
        }
        ], { duration: 1000, fill: 'forwards', iterations: 1 });
        console.log(`Starting animation from: ${relativePos}`);
        return boxAnimRef.current;
    }, []);

    useEffect(() =>
    {   
        if (boxXLoaded)
        {       
            boxRef.current!.style.animationPlayState = 'running';
            console.log(`Starting animation from: ${boxX}`);
            boxAnimRef.current = newAnimation();
        }
    }, [boxXLoaded])

    useEffect(() => {
        setBoxX(boxRef.current!.getBoundingClientRect().left)
        setBoxXLoaded(true);
        const animate = () => {
            setBoxX(boxRef.current!.getBoundingClientRect().left)
            animationRef.current = requestAnimationFrame(animate);
        };
        animationRef.current = requestAnimationFrame(animate);
    }, []);
    
    return (
        <>
        <p data-testid='box-1x'>
            X: {boxXCurrRef.current}
        </p>
        <svg style={{'width': '100%','border': '1px solid black'}} ref={svgRef}>
            <Rect ref={boxRef} {...rest} /> 
        </svg>
        </>
);
}
