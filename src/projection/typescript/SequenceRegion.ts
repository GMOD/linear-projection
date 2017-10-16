/**
 * This is a region of sequence (e.g., a chromosome) that contains visible regions.
 * Used to represent folding
 */
import VisibleRegion from "./VisibleRegion";

export declare const UNMAPPED_REGION : -1 ;


export default class SequenceRegion {

    constructor(name: string, start: number, end: number) {
        this.name = name ;
        this.start = start ;
        this.end = end ;
        this.regions = new Array<VisibleRegion>();

        this.applyDefaults();
    }

    private applyDefaults() {
        this.visibleStartBp = this.start ;
        this.visibleEndBp = this.end ;
        this.length = this.end - this.start ;
        this.order = 0 ;

        this.addVisibleRegionByCoordinates(this.start,this.end);
    }

    // projection: DiscontinuousProjection;

    order: number; // place it shows up


    visibleStartBp: number; // default 0
    visibleEndBp: number; // default length
    start: number;
    end: number;
    length: number;
    name: string;

    regions:Array<VisibleRegion>;

    addVisibleRegion(region: VisibleRegion) {
        this.regions.push(region);
    }

    addVisibleRegionByCoordinates(start:number, end: number) {
        let region = new VisibleRegion(start,end);
        this.addVisibleRegion(region);
    }

    projectValue(number: number) {
        return number  ;

    }
}