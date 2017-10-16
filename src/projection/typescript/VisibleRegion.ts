/**
 * This was be a visible region implying that either side is the sequence start/the end or a fold start/end.
 */
export default class VisibleRegion{

    start: number;
    end: number;
    startLabel: string;
    endLabel: string;

    constructor(start: number, end: number, startLabel = start.toString(), endLabel = end.toString() ){
        this.start = start ;
        this.end = end ;
        this.startLabel = startLabel ;
        this.endLabel = endLabel ;
    }

}