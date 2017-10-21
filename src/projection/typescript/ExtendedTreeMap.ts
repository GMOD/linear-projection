import {TreeMap, MapIterator} from "tstl/lib/tstl";

export default class ExtendedTreeMap<K,V> extends TreeMap<K,V>{

    floor(k:K){
        let mapIterator:MapIterator<K,V> = super.lower_bound(k)

        let nextIter = mapIterator.next();
        // while(nextIter!=mapIterator.end()){
        //
        //     if(nextIter.first < k){
        //         // return the prior one
        //         return nextIter ;
        //     }
        //
        //     nextIter = mapIterator.next();
        // }
        return mapIterator ;
    }

    ceil(k:K){
        let mapIterator:MapIterator<K,V> = super.upper_bound(k)

        let nextIter = mapIterator.next();
        // while(nextIter!=mapIterator.end()){
        //
        //     if(nextIter.first > k){
        //         // return the prior one
        //         return nextIter ;
        //     }
        //
        //     nextIter = nextIter.next();
        // }
        return nextIter;
    }

}