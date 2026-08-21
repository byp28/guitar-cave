export function generateUniqueIndexes(max:number, maxLenght : number) : number[] {

    const result: Set<number> = new Set<number>();

    while (result.size < maxLenght) {
        result.add(Math.floor(Math.random() * max));
    }

    return [...result];
}


// export function generateUniqueIndexes(max:number) : number[] {
//     if (max < 4) {
//         throw new Error("La taille maximale doit être au moins 4.");
//     }

//     const result: Set<number> = new Set<number>();

//     while (result.size < 4) {
//         result.add(Math.floor(Math.random() * max));
//     }

//     return [...result];
// }