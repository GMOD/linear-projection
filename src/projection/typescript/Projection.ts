interface Projection {

    projectValues(reference:string,input:Array<number>):Array<number>;
    unProjectValues(reference:string,input:Array<number>):Array<number>;
    toString():string;
}
