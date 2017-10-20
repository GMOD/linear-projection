/**
 * This is a region of sequence (e.g., a chromosome) that contains visible regions.
 * Used to represent folding
 */
import VisibleRegion from "./VisibleRegion";
import {TreeMap, Pair} from "tstl/lib/tstl";
import {assert} from "~chai/lib/Chai";

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


        // TODO: remove in favor of the method below
        this.minMap.insert(new Pair<number,VisibleRegion>(region.start,region));
        this.maxMap.insert(new Pair<number,VisibleRegion>(region.end,region));

//         let min = region.start ;
//         let max = region.end ;
//         min = min < 0 ? 0 : min;
//         // assert max >= min;
//
//         let floorMinKey = this.minMap.lower_bound(min).first;
//         let ceilMinKey = this.minMap.ceilingKey(min);
//
//         Long floorMaxKey = maxMap.floorKey(max);
//         Long ceilMaxKey = maxMap.ceilingKey(max);
//
//         Coordinate floorMinCoord = floorMinKey != null ? minMap.get(floorMinKey) : null;
//         Coordinate floorMaxCoord = floorMaxKey != null ? maxMap.get(floorMaxKey) : null;
//         Coordinate ceilMaxCoord = ceilMaxKey != null ? maxMap.get(ceilMaxKey) : null;
//         Coordinate ceilMinCoord = ceilMinKey != null ? minMap.get(ceilMinKey) : null;
//
//         // no entries at all . . just add
//         if (floorMinCoord == null && floorMaxCoord == null && ceilMinCoord == null && ceilMaxCoord == null) {
//             return addCoordinate(min, max);
//         } else
//         // empty floor / LHS side
//         if (floorMinCoord == null && floorMaxCoord == null && ceilMinCoord != null && ceilMaxCoord != null) {
//             assert ceilMinCoord == ceilMaxCoord;
//             if (max < ceilMinCoord.getMin()) {
//                 return addCoordinate(min, max);
//             }
//             return replaceCoordinate(ceilMinCoord, min, ceilMinCoord.getMax());
//         } else
//         // empty ceil / RHS side
//         if (floorMinCoord != null && floorMaxCoord != null && ceilMinCoord == null && ceilMaxCoord == null) {
// //            floorMinCoord == floorMaxCoord
//             if (min > floorMaxCoord.getMax()) {
//                 return addCoordinate(min, max);
//             }
//             return replaceCoordinate(floorMaxCoord, floorMinCoord.getMin(), max);
//         }
//         // overlapping within?
//         if (floorMinCoord != null && floorMaxCoord == null && ceilMinCoord == null && ceilMaxCoord != null) {
//             assert floorMinCoord == ceilMaxCoord;
//             return replaceCoordinate(floorMinCoord, Math.min(min, floorMinCoord.getMin()), Math.max(max, ceilMaxCoord.getMax()));
//         }
//         // overlapping without?
//         if (floorMinCoord == null && floorMaxCoord != null && ceilMinCoord != null && ceilMaxCoord == null) {
//             assert floorMaxCoord == ceilMinCoord;
//             return replaceCoordinate(floorMaxCoord, Math.min(min, floorMaxCoord.getMin()), Math.max(max, ceilMinCoord.getMax()));
//         }
//         // if we are internal / in the middle
//         if (floorMinCoord == null && ceilMinCoord == null && floorMaxCoord != null && ceilMaxCoord != null) {
//             return null;
//         }
//         if (floorMinCoord != null && ceilMinCoord != null && floorMaxCoord != null && ceilMaxCoord == null) {
//             if (floorMinCoord == floorMaxCoord && floorMaxCoord == ceilMinCoord) {
//                 if (max > floorMaxCoord.getMax()) {
//                     return replaceCoordinate(floorMinCoord, floorMinCoord.getMin(), max);
//                 }
//             }
//             return null;
//         }
//         // if we are right on the right edge
//         if (floorMinCoord == null && ceilMinCoord != null && floorMaxCoord != null) {
//             if (floorMaxCoord == ceilMaxCoord && ceilMaxCoord == ceilMinCoord) {
//                 if (min < floorMaxCoord.getMin()) {
//                     return replaceCoordinate(floorMaxCoord, min, floorMaxCoord.getMax());
//                 }
//                 return null;
//             }
//             return null;
//         }
//         // if we are at the right edge
//         if (floorMinCoord == null && ceilMinCoord == null && floorMaxCoord != null) {
//             if (min > floorMaxKey) {
//                 return addCoordinate(min, max);
//             }
//             return replaceCoordinate(floorMaxCoord, floorMaxCoord.getMin(), max);
//         }
//         // if we are at the right edge
//         if (floorMinCoord != null && floorMaxCoord != null && ceilMinCoord == null && ceilMaxCoord.equals(floorMinCoord)) {
//             if (min >= floorMinCoord.getMin() && max <= ceilMaxCoord.getMax()) {
//                 return null;
//             }
//             return null;
//         }
//         // overlapping without?
//         if (floorMinCoord != null && floorMaxCoord != null && ceilMinCoord != null) {
//             // this overlaps on both sides
//             if (floorMinCoord != floorMaxCoord && ceilMinCoord != ceilMaxCoord && floorMaxCoord == ceilMinCoord) {
//
//                 if (min < ceilMinCoord.getMin() && min > floorMinCoord.getMax() && max > floorMaxCoord.getMax() && max < ceilMaxCoord.getMin()) {
//                     return replaceCoordinate(floorMaxCoord, min, max);
//                 } else
//                 // in-between all, so just add
//                 if (min > floorMaxCoord.getMax() && max < ceilMinCoord.getMin()) {
//                     return addCoordinate(min, max);
//                 }
//                 // putting on the LHS
//                 else if (min > floorMaxCoord.getMax() && max < ceilMaxCoord.getMax()) {
//                     return replaceCoordinate(ceilMinCoord, min, ceilMaxCoord.getMax());
//                 }
//                 // putting on the RHS
//                 else if (min < floorMaxCoord.getMax() && max < ceilMaxCoord.getMin()) {
//                     return replaceCoordinate(floorMinCoord, floorMinCoord.getMin(), max);
//                 } else if (min < floorMaxCoord.getMin() && max < ceilMaxCoord.getMin()) {
//                     return replaceCoordinate(floorMinCoord, floorMinCoord.getMin(), ceilMaxCoord.getMax());
//                 } else if (min > floorMinCoord.getMin() && min < floorMinCoord.getMax() && max > ceilMaxCoord.getMin() && max < ceilMaxCoord.getMax()) {
//                     return replaceCoordinate(floorMinCoord, floorMinCoord.getMin(), ceilMaxCoord.getMax());
//                 } else {
//                     Long newMin = min > floorMinCoord.getMax() ? floorMinCoord.getMin() : min;
//                     Long newMax = max < ceilMaxCoord.getMin() ? max : ceilMaxCoord.getMax();
//                     return replaceCoordinate(floorMinCoord, newMin, newMax);
//                 }
//             } else if (floorMinCoord != floorMaxCoord && ceilMinCoord == ceilMaxCoord) {
//                 return replaceCoordinate(floorMinCoord, Math.min(min, floorMinCoord.getMin()), Math.max(max, ceilMaxCoord.getMax()));
//             }
//             // if we have coordinates on either side
//             else if (floorMinCoord.equals(floorMaxCoord) && ceilMinCoord.equals(ceilMaxCoord) && !ceilMinCoord.equals(floorMinCoord)) {
//                 // in-between all, so just add
//                 if (min > floorMaxKey && max < ceilMinKey) {
//                     return addCoordinate(min, max);
//                 }
//                 // putting on the LHS
//                 else if (min > floorMaxKey && max < ceilMaxCoord.getMax()) {
//                     return replaceCoordinate(ceilMinCoord, min, ceilMaxCoord.getMax());
//                 }
//                 // putting on the RHS
//                 else if (min < floorMaxCoord.getMax() && max < ceilMaxCoord.getMin()) {
//                     return replaceCoordinate(floorMinCoord, floorMinCoord.getMin(), max);
//                 }
//                 // bridging two intervals
//                 else if (min > floorMinCoord.getMin() && max < ceilMaxCoord.getMax() && min < ceilMaxCoord.getMin() && max > floorMinCoord.getMax()) {
//                     return replaceCoordinate(floorMinCoord, floorMinCoord.getMin(), ceilMaxCoord.getMax());
//                 } else {
//                     Long newMin = min > floorMinCoord.getMax() ? floorMinCoord.getMin() : min;
//                     Long newMax = max < ceilMaxCoord.getMin() ? max : ceilMaxCoord.getMax();
//                     return replaceCoordinate(floorMinCoord, newMin, newMax);
//                 }
//             }
//             // sitting on the right edge, internal
//             else if (floorMinCoord.equals(floorMaxCoord) && !ceilMinCoord.equals(ceilMaxCoord) && floorMaxCoord.equals(ceilMaxCoord)) {
//                 return null;
//             }
//             // in the case they are in-between an existing scaffold
//             else if (floorMinCoord.equals(ceilMaxCoord) && !ceilMinCoord.equals(ceilMaxCoord) && !floorMaxCoord.equals(floorMinCoord) && !floorMaxCoord.equals(ceilMinCoord)) {
//                 return null;
//             } else if (floorMinCoord.equals(ceilMinCoord) && !ceilMinCoord.equals(ceilMaxCoord) && !floorMaxCoord.equals(floorMinCoord) && !floorMaxCoord.equals(ceilMinCoord)) {
//                 return replaceCoordinate(floorMinCoord, min, ceilMaxCoord.getMax());
//             } else if (floorMaxCoord.equals(ceilMaxCoord) && !ceilMinCoord.equals(ceilMaxCoord) && !floorMaxCoord.equals(floorMinCoord) && !floorMinCoord.equals(ceilMinCoord)) {
//                 return replaceCoordinate(floorMinCoord, floorMinCoord.getMin(), ceilMaxCoord.getMax());
//             } else if (floorMinCoord.equals(floorMaxCoord) && floorMaxCoord.equals(ceilMinCoord) && !floorMinCoord.equals(ceilMaxCoord)) {
//                 return null;
//             }
//
//             return addCoordinate(min, max);
//
//         } else {
//             return addCoordinate(min, max);
//         }



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

    clearVisibleRegions() {
        this.minMap.clear();
        this.maxMap.clear();
    }
}