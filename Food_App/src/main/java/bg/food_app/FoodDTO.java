package bg.food_app;

import lombok.Data;

@Data
public class FoodDTO {

    Long foodId;
    String description;
    Long carbs;

    Long fat;

    Long protein;

    Long kcal;
}
