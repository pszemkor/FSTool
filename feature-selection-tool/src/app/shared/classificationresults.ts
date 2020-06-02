export class ClassificationResults{
    classifier: string
    results: SingleResult[]
}


export class SingleResult{
    id: string
    prediction: string
}