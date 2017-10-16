
// from MultiSequenceProjectionSpec

import SequenceRegion from '../src/projection/typescript/SequenceRegion';
import { expect } from 'chai';
import VisibleRegion from "../src/projection/typescript/VisibleRegion";
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
describe('Build Sequence Region Function as a Default', () => {
    it('Should build a sequence region', () => {
        let start = 0 ;
        let end = 100 ;
        let name = 'chr1';
        const region = new SequenceRegion(name,start,end);
        expect(region.start).to.equal(start);
        expect(region.end).to.equal(end);
        expect(region.name).to.equal(name);
        expect(region.order).to.equal(0);
        expect(region.length).to.equal(end - start );
        expect(region.regions.length).to.equal(1);

        let projectedRegion:VisibleRegion = region.regions[0];

        expect(projectedRegion.start).to.equal(start);
        expect(projectedRegion.end).to.equal(end);
        expect(projectedRegion.startLabel).to.equal(start+'');
        expect(projectedRegion.endLabel).to.equal(end+'');

    });
});

describe('Overlapping ProjectedRegions should be the union', () => {
    it('Should build a sequence region', () => {
        let start = 0 ;
        let end = 100 ;
        let name = 'chr1';
        const region = new SequenceRegion(name,start,end);
        region.addVisibleRegionByCoordinates(0,2) ;
        region.addVisibleRegionByCoordinates(4,6) ;
        region.addVisibleRegionByCoordinates(8,9) ;

        expect(region.projectValue(0)).to.equal(0);
        expect(region.projectValue(1)).to.equal(1);
        expect(region.projectValue(2)).to.equal(2);
        // expect(1).to.equal( region.projectValue(1))
        // expect(2).to.equal( region.projectValue(2))
//         expect(AbstractProjection.UNMAPPED_VALUE == region.projectValue(3))
//         expect(3).to.equal( region.projectValue(4))
//         expect(4).to.equal( region.projectValue(5))
//         expect(5).to.equal( region.projectValue(6))
//         expect(AbstractProjection.UNMAPPED_VALUE == region.projectValue(7))
//         expect(6).to.equal( region.projectValue(8))
//         expect(7).to.equal( region.projectValue(9))
//         expect(AbstractProjection.UNMAPPED_VALUE == region.projectValue(10))
// )
//         // in-phase)
//         expect(new Coordinate(3,4) == region.projectCoordinate(4, 5))
//         // right-edge)
//         expect(nul).to.equal( region.projectCoordinate(2, 3))
//         // left-edge)
//         expect(nul).to.equal( region.projectCoordinate(3, 4))
//         // right-edge overlap)
//         expect(new Coordinate(1,2) == region.projectCoordinate(1, 3))
//         // right-edge overlap)
//         expect(new Coordinate(3, 4) == region.projectCoordinate(4, 5))
//         // left-edge overlap)
//         expect(new Coordinate(3, 4) == region.projectCoordinate(3, 5))
//         // AB overlap)
//         expect(new Coordinate(1, 4) == region.projectCoordinate(1, 5))
//         // AC overlap)
//         expect(new Coordinate(1,  7) == region.projectCoordinate(1, 9))
// )
//         // test reverse values)
//         expect(0).to.equal( region.unProjectValue(0))
//         expect(1).to.equal( region.unProjectValue(1))
//         expect(2).to.equal( region.unProjectValue(2))
//         expect(4).to.equal( region.unProjectValue(3))
//         expect(5).to.equal( region.unProjectValue(4))
//         expect(6).to.equal( region.unProjectValue(5))
//         expect(8).to.equal( region.unProjectValue(6))
//         expect(9).to.equal( region.unProjectValue(7))

    });
});
