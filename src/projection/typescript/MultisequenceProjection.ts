import std = require("tstl");
import SequenceRegion from "./SequenceRegion";


class MultiSequenceProjection implements Projection{

    // ordered unique set
    sequences: std.TreeSet<SequenceRegion>;

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