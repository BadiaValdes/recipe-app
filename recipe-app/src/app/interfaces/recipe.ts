
export interface Recipe {
    id: string,
    slug: string,
    name: string,
    img: string,
    description: string,
    fk_difficult: string,
    fk_category: string,
    steps: string,
    recipe_ingredient: any[],

}
