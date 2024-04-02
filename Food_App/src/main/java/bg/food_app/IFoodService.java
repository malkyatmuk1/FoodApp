package bg.food_app;

import java.util.List;
import java.util.Optional;

public interface IFoodService {
    List<Food> getFood();

    void addFood(FoodDTO food);

    void editFood(FoodDTO food);
    void deleteFood(String id);

    Optional<Food> getFoodById(String id);
}
