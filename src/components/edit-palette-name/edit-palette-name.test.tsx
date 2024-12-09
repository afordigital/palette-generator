import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { EditPaletteName } from './EditPaletteName';

describe('./src/components/edit-palette-name/EditPaletteName.tsx', () => {
    test('should render a edit button', () => {
        render(<EditPaletteName />);

        const editBtn: HTMLElement = screen.getByLabelText(/edit button/i);

        expect(editBtn).toBeInTheDocument();
    });
});