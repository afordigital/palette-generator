import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { DeletePalette } from "./DeletePalette";

import userEvent from "@testing-library/user-event";
import { Toaster } from "sonner";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            { children }
            <Toaster />
        </>
    );
};

describe('./src/components/delete-palette/DeletePalette.tsx', () => {  
    const action = vi.fn();
    const colorName: string = "color-name";

    test("should handle a click on the delete button", async () => {

        render(<DeletePalette action={action} name={colorName}/>);

        const deleteButton: HTMLElement =  screen.getByLabelText(/delete palette/i);

        await userEvent.click(deleteButton);

        const dialog: HTMLElement = screen.getByRole("alertdialog");

        expect(dialog).toBeInTheDocument();        
    });

    test("should render a cancel delete button and a confirm delete button", async () => {
        render(<DeletePalette action={action} name={colorName}/>);

        const deleteButton: HTMLElement =  screen.getByLabelText(/delete palette/i);

        await userEvent.click(deleteButton);

        const cancelDelete: HTMLElement = screen.getByLabelText(/cancel delete/i);
        const confirmDelete: HTMLElement = screen.getByLabelText(/confirm delete/i);

        expect(cancelDelete).toBeInTheDocument();    
        expect(confirmDelete).toBeInTheDocument();    
    });

    test("should cancel the deletion of a color in the palette", async () => {
        render(<DeletePalette action={action} name={colorName}/>);

        const deleteButton: HTMLElement =  screen.getByLabelText(/delete palette/i);

        await userEvent.click(deleteButton);

        const cancelDelete: HTMLElement = screen.getByLabelText(/cancel delete/i);

        await userEvent.click(cancelDelete);

        expect(cancelDelete).not.toBeInTheDocument(); 
    });

    test("should confirm the deletion of a color in the palette", async () => {
        render(<DeletePalette action={action} name={colorName}/>, { wrapper: Wrapper });

        const deletePaletteButton: HTMLElement =  screen.getByLabelText(/delete palette/i);

        await userEvent.click(deletePaletteButton);

        const confirmDelete: HTMLElement = screen.getByLabelText(/confirm delete/i);

        await userEvent.click(confirmDelete);

        const toastMessage = screen.getByText(/Palette deleted correctly! 🐭/i);

        expect(action).toHaveBeenCalledWith(colorName);
        expect(toastMessage).toBeInTheDocument();
    });
});