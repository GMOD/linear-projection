/**
 * This is a region of sequence (e.g., a chromosome) that contains visible regions.
 * Used to represent folding
 */
import VisibleRegion from "./VisibleRegion";
import {TreeMap, Pair} from "tstl/lib/tstl";

export declare const UNMAPPED_REGION : -1 ;


export default class SequenceRegion {

    // projection from X -> X'
    // TreeMap<number, Coordinate> minMap = new TreeMap<>();
    // TreeMap<number, Coordinate> maxMap = new TreeMap<>();

    minMap:TreeMap<number,VisibleRegion> = new TreeMap<number,VisibleRegion>();
    maxMap:TreeMap<number,VisibleRegion> = new TreeMap<number,VisibleRegion>();

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

    addVisibleRegion(region: VisibleRegion) {
        // region.start,region
        // if (minMap.containsKey(min) && !maxMap.containsKey(max)) {
        //     throw new RuntimeException("minKey is dupe and should be replaced ${min}::${max}");
        // }
        // if (!minMap.containsKey(min) && maxMap.containsKey(max)) {
        //     throw new RuntimeException("maxKey is dupe and should be replaced ${min}::${max}");
        // }


        this.minMap.push(new Pair<number,VisibleRegion>(region.start,region));
        this.maxMap.push(new Pair<number,VisibleRegion>(region.end,region));
    }

    addVisibleRegionByCoordinates(start:number, end: number) {
        let region = new VisibleRegion(start,end);
        this.addVisibleRegion(region);
    }

    projectValue(input: number): number {
        if (this.minMap.empty() && this.maxMap.empty()) {
            return input;
        }

        if (input == null) {
            return UNMAPPED_REGION;
        }

        let floorMinKey:number = this.minMap.lower_bound(input).next().first;
        let ceilMinKey = this.minMap.upper_bound(input).next().first;

        let floorMaxKey = this.maxMap.lower_bound(input).next().first;
        let ceilMaxKey = this.maxMap.upper_bound(input).next().first;

        if (floorMinKey == null || ceilMaxKey == null) {
            return UNMAPPED_REGION;
        }

        // if is a hit for min and no max hit, then it is the left-most
        if (floorMinKey == ceilMinKey) {
            if (floorMaxKey == null) {
                return 0;
            } else {
//                return input - floorMaxKey
                return this.projectValue(floorMaxKey) + 1;
            }
        }

        // this is the left-most still
        if (floorMinKey != ceilMinKey && floorMaxKey == null) {
            return input - floorMinKey;
        }

        // if we are at the max border
        if (floorMaxKey == ceilMaxKey) {
            return input - floorMinKey + this.projectValue(floorMinKey);
        }

        // if we are inbetween for the last large one on the RHS
        if (floorMaxKey != ceilMaxKey && ceilMinKey == null) {
            return input - floorMinKey + this.projectValue(floorMinKey);
        }

        // if we are inbetween a ceiling max and floor min, then we are in a viable block
        if (ceilMinKey!=null && input > floorMinKey && input < ceilMaxKey && ceilMinKey >= ceilMaxKey) {
            return input - floorMinKey + this.projectValue(floorMinKey);
        }


//        log.debug "${input} unable to find match, re

    }
}