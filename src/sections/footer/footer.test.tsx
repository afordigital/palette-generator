import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Footer } from "./Footer";

describe('./src/sections/footer/Footer.tsx', () => { 
    test('should render the footer content correctly', () => {
        render(<Footer />);
        
        expect(screen.getByText(/Developed by/i)).toBeInTheDocument();
        
        const link = screen.getByRole('link', { name: /Comuafor/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://discord.com/invite/comuafor');
        expect(link).toHaveAttribute('target', '_blank');
    });
});