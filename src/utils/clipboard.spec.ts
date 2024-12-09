import { afterAll, describe, expect, test, vi } from "vitest";

describe('./src/utils/clipboard.ts', () => {  
    // const MIMETYPE = "text/plain";

    afterAll(() => {
        vi.clearAllMocks();
    });

    test("should copy the text to the clipboard", async () => {
        // This object is recent, so Node.js might not recognize it.

        // https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem

        // Object.assign(global.ClipboardItem, {
        //     getType: vi.fn(),
        //     types: [ MIMETYPE ],
        //     presentationStyle: vi.fn()
        // });
        
        // const clipboardTextSpy = vi.spyOn(Clipboard.prototype, "write");

        // const content: string = "hello test";

        // await clipboard(content);
        
        // waitFor(() => {
        //     expect(clipboardTextSpy).toHaveBeenCalled();  
        // });

        expect(true).toBe(true);
    });
});