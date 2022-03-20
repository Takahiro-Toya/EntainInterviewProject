
export enum Category {
    Greyhound = '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
    Harness = '161d9be2-e909-4326-8c2c-35ed71fb460b',
    Horse = '4a2788f8-e825-4d36-9894-efd4baf1cfae'
}

export const CategoryEnumHelper = {
    categoryName: (category: Category): string => {
        switch (category) {
            case Category.Greyhound: return "Greyhound"
            case Category.Harness: return "Harness"
            case Category.Horse: return "Horse"
        }
    },
    
    // get Category enum from index 
    // hard coded index
    indexToCategory: (index: number): Category | null => {
        if (index === 0) { return Category.Greyhound }
        if (index === 1) { return Category.Harness }
        if (index === 2) { return Category.Horse }
        return null
    }
}
