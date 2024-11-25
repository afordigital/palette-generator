class EventErrors extends Error{
    private constructor(
        public readonly message: string,
        public readonly responsible: string,
    ){
        super(message);
    }

    public static mouseDown(message:string, responsible:string): EventErrors{
        return new EventErrors(message, responsible);
    }
}

export default EventErrors;