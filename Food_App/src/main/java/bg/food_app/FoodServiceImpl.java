package bg.food_app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodServiceImpl
    implements IFoodService {

    @Autowired
    FoodRepository foodRepository;

    @Override
    public List<Food> getFood() {
        return foodRepository.findAll();
    }

/*    private List<FoodOutputBean> createListOutputBean() {
        List<Food> foodList = foodRepository.findAll();
        List<FoodOutputBean> result = new ArrayList<>();
        for (Food food : foodList) {
            FoodOutputBean outputBean = new FoodOutputBean(food.getFoodId(), food.getDescription(), food.getCarbs(),
                food.getFat(), food.getProtein(), food.getKcal());
            result.add(outputBean);
        }
        return result;
    }*/

    @Override
    public void addFood(FoodDTO food) {
        Food foodEntity = createFood(food);
        this.foodRepository.save(foodEntity);
    }

    @Override
    public void editFood(FoodDTO food) {
        Food foodEntity = getEditedFood(food);
        this.foodRepository.save(foodEntity);
    }

    @Override
    public void deleteFood(String foodId) {
        Optional<Food> foodToDelete = this.foodRepository.findById(foodId);
        if(foodToDelete.isPresent()){
            this.foodRepository.delete(foodToDelete.get());
        }
    }

    @Override
    public Optional<Food> getFoodById(String id) {
        return this.foodRepository.findById(id);
    }

    private Food createFood(FoodDTO food) {
        return new Food(food.getDescription(), Long.valueOf(food.getKcal()),  Long.valueOf(food.getProtein()),  Long.valueOf(food.getFat()),  Long.valueOf(food.getCarbs()));
    }

    private Food getEditedFood(FoodDTO food) {
        Optional<Food> foodBeforeEdit = this.foodRepository.findById(String.valueOf(food.getFoodId()));
        Food edited = new Food();
        if (foodBeforeEdit != null) {
            edited.setFoodId(food.getFoodId());
            edited.setDescription(food.getDescription());
            edited.setKcal(food.getKcal());
            edited.setFat(food.getFat());
            edited.setCarbs(food.getCarbs());
            edited.setProtein(food.getProtein());
        }
        return edited;
    }
}
