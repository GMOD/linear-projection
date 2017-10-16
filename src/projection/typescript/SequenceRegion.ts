/**
 * This is a region of sequence that contains sequences.
 * This is basically a sequence.
 */
import ProjectedRegion from "./ProjectedRegion";

export default class SequenceRegion {

    constructor(name: string, start: number, end: number) {
        this.name = name ;
        this.start = start ;
        this.end = end ;

        this.applyDefaults();
    }

    private applyDefaults() {
        this.visibleStartBp = this.start ;
        this.visibleEndBp = this.end ;
        this.length = this.end - this.start ;
        this.order = 0 ;

        // this.projection = new DiscontinuousProjection();
        // this.projection.start = this.start;
        // this.projection.end = this.end;

        let region = new ProjectedRegion(this.start,this.end);
        this.regions = new Array<ProjectedRegion>();
        this.regions.push(region);
    }

    // projection: DiscontinuousProjection;

    order: number; // place it shows up


    visibleStartBp: number; // default 0
    visibleEndBp: number; // default length
    start: number;
    end: number;
    length: number;
    name: string;

    regions:Array<ProjectedRegion>;

}