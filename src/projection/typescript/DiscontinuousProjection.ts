
class DiscontinuousProjection implements Projection{

    name: string;
    start: number;
    end: number;

    // ordered, non-overlapping set
    // should be treemap
    regions:Array<ProjectedRegion>;

    constructor(input:object){

    }

    projectValues(reference: string, input: Array<number>) :Array<number>{
        return input;
    }

    unProjectValues(reference: string, input: Array<number>) :Array<number>{
        return input;
    }

    toString():string{
        return null;
    };
}