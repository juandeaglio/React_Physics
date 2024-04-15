import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Greeting from '../src/Components/Greeting';

describe('Greeting', () => {
    it('renders a greeting message with the provided name', () => {
        const name = 'John';
        render(<Greeting name={name} />);

        const greetingElement = screen.getByText(`Hello, ${name}!`);
        expect(greetingElement).toBeInTheDocument();
    });
});