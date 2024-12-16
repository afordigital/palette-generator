import { beforeEach, describe, expect, test, vi } from "vitest";

import store from "./palettes";

describe('./src/utils/palettes.ts', () => {
    // const palettesModule = (await import("./palettes")).default;

    beforeEach(() => {
        vi.resetAllMocks();
    });

    test("should have the following methods: add(), rem(), getSnapshot(), subscribe(), updatePaletteName()", async () => {

        expect(typeof store.add).toBe('function');
        expect(typeof store.rem).toBe('function');
        expect(typeof store.getSnapshot).toBe('function');
        expect(typeof store.subscribe).toBe('function');
        expect(typeof store.updatePaletteName).toBe('function');
    });

    test("should save a color in localstorage",async () => {
        const addSpy = vi.spyOn(store, "add");
        const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

        store.add("testColor", "#testing-app");

        expect(addSpy).toHaveBeenCalled();
        expect(addSpy).toHaveBeenCalledWith("testColor","#testing-app");
        expect(setItemSpy).toHaveBeenCalledWith('palettes', JSON.stringify({ testColor: "#testing-app" }));
        expect(store.getSnapshot()).toMatchObject({ testColor: '#testing-app' });
    });

    test("should delete a color from localstorage", async () => {
        const object = Object.keys([]);
        const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
        
        vi.spyOn(object, "reduce").mockReturnValue({ testColor: "#testing-app" });
        
        store.rem("testColor");
        
        expect(setItemSpy).toHaveBeenCalledWith( "palettes", "{}" );
        expect(store.getSnapshot()).toMatchObject({});
    });

    test("should verify errors using the updatePaletteName() method", async () => {
        const newName: string = "newNameTestColor";
        store.add(newName, "#testing-app");

        const errorName = store.updatePaletteName('','');
        const errorNameAlreadyExist = store.updatePaletteName(newName, 'testColor😊');

        expect(errorName).toBe("The name cannot be empty! 🐭");
        expect(errorNameAlreadyExist).toBe('');

        // `The name ${newName} already exists! 🐭`
    });
});
