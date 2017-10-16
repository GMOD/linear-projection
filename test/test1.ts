import SequenceRegion from '../src/projection/typescript/SequenceRegion';
import { expect } from 'chai';
import ProjectedRegion from "../src/projection/typescript/ProjectedRegion";
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
describe('Build Sequence Region Function as a Default', () => {
    it('Should build a sequence region', () => {
        let start = 0 ;
        let end = 100 ;
        let name = 'chr1'
        const region = new SequenceRegion(name,start,end);
        expect(region.start).to.equal(start);
        expect(region.end).to.equal(end);
        expect(region.name).to.equal(name);
        expect(region.order).to.equal(0);
        expect(region.length).to.equal(end - start );
        expect(region.regions.length).to.equal(1);

        let projectedRegion:ProjectedRegion = region.regions[0];

        expect(projectedRegion.start).to.equal(start);
        expect(projectedRegion.end).to.equal(end);
        expect(projectedRegion.startLabel).to.equal(start+'');
        expect(projectedRegion.endLabel).to.equal(end+'');

    });
});