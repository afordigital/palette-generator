class ServiceErrors extends Error{
    private constructor(
        public readonly message:string,
        public readonly service:string,
        public readonly responsible:string
    ){
        super(message);
    }

    public static InstanceSAlreadyExist(message:string, service:string, responsible:string): ServiceErrors{
        return new ServiceErrors(message, service, responsible);
    }
}

export default ServiceErrors;