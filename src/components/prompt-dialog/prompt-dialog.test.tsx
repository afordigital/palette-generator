import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import PromptDialog from './PromptDialog';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';


const Wrapper = ({ onSubmit }: { onSubmit: () => void }) => {
    const [ isLoading, setIsLoading ] = useState(false);

    return (
        <PromptDialog 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            open={true}
            onCancel={() => {}}
            onSubmit={onSubmit}
        />
    );
};


describe('./src/components/prompt-dialog/PromptDialog.tsx', () => {
    test('should open the AlertDialog component', () => {
        render(
            <PromptDialog 
                isLoading={false}
                open={true}
                onCancel={() => {}}
                onSubmit={() => {}}
                setIsLoading={() => {}}
            />
        );

        const alertDialog: HTMLElement = screen.getByRole("alertdialog");

        expect(alertDialog).toBeInTheDocument();
    });

    test("should render a title and a description", () => {
        render(
            <PromptDialog 
                isLoading={false}
                open={true}
                onCancel={() => {}}
                onSubmit={() => {}}
                setIsLoading={() => {}}
            />
        );

        const alertDialogTitle: HTMLElement = screen.getByText(/Generate AI Color/i);
        const alertDialogDescription: HTMLElement = screen.getByText(/Describe the color you want to generate. Be specific about the use case, mood, or style you're looking for./i);

        expect(alertDialogTitle).toBeInTheDocument();
        expect(alertDialogDescription).toBeInTheDocument();
    });

    test("should render a textarea", async () => {
        render(
            <PromptDialog 
                isLoading={false}
                open={true}
                onCancel={() => {}}
                onSubmit={() => {}}
                setIsLoading={() => {}}
            />
        );

        const textarea: HTMLElement = screen.getByPlaceholderText(/Describe the color you want to generate.../i);

        expect(textarea).toBeInTheDocument();
    });

    test("should type a prompt", async () => {
        const newPrompt: string = "Why afor digital always wear a sweater";

        render(
            <PromptDialog 
                isLoading={false}
                open={true}
                onCancel={() => {}}
                onSubmit={() => {}}
                setIsLoading={() => {}}
            />
        );

        const textarea: HTMLElement = screen.getByPlaceholderText(/Describe the color you want to generate.../i);

        await userEvent.clear(textarea);
        await userEvent.type(textarea, `${newPrompt}`);

        expect(textarea).toBeInTheDocument();
        expect(textarea.textContent).toBe(newPrompt);
    });

    test("should render a cancel button and handle its click", async () => {
        const cancelCallbackMock = vi.fn();

        render(
            <PromptDialog 
                isLoading={false}
                open={true}
                onCancel={cancelCallbackMock}
                onSubmit={() => {}}
                setIsLoading={() => {}}
            />
        );

        const cancelButton: HTMLElement = screen.getByText(/Cancel/i);

        await userEvent.click(cancelButton);

        expect(cancelCallbackMock).toHaveBeenCalled();
    });

    test("should render a generate button and handle its click", async () => {

        function geminiResponse(color: string) {
            return {
                candidates: [
                    {
                        content: {
                            parts: [
                                {
                                    text: color,
                                }
                            ]
                        }
                    }
                ]
            };
        }
        
        global.fetch = vi.fn(
            () => Promise.resolve({
                    json: () => Promise.resolve(geminiResponse("#e2f5dd")),
                    ok: true,
                    status: 200,
                } as Response
            )
        );

        const onSubmitMock = vi.fn();

        render(<Wrapper onSubmit={onSubmitMock}/>);

        const generateButton: HTMLElement = screen.getByRole("button", { name: "Generate" });

        await userEvent.click(generateButton);

        const loaderSvg: HTMLElement = screen.getByLabelText(/loader/i);

        expect(onSubmitMock).toHaveBeenCalled();
        expect(loaderSvg).toBeInTheDocument();
    });
});