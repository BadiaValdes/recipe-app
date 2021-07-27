export interface Ingredient {
    id: string,
    fk_recipe: string,
    fk_product: string,
    fk_measurement_unit: string,
    main_ingredient: boolean,
    amount: number,
}

