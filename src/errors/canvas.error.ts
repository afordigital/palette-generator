class CanvasError extends Error {
    private constructor(
        public readonly message: string,
        public readonly responsible: string,
    ) {
        super(message);
    }

    public static context(message: string, responsible: string): CanvasError {
        return new CanvasError(`Context: ${message}`, responsible);
    }

    public static instance(message: string, responsible: string):CanvasError {
        return new CanvasError(`Canvas instance: ${message}`, responsible);
    }
}

export default CanvasError;