
class MultisequenceProjection implements Projection{

    // ordered unique set
    sequences: Array<DiscontinuousProjection>;

    constructor(input: object){
    }

    projectValues(reference: string, input: Array<number>):Array<number> {
        return input;
    }

    unProjectValues(reference: string, input: Array<number>):Array<number> {
        return input;
    }


    toString():string{
        return null;
    };

}