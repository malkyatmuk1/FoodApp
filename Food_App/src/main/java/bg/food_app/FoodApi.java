package bg.food_app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FoodApi {

    @Autowired
    IFoodService foodService;
    @GetMapping("/food")
    public List<Food> getFood() {
        List<Food> foodResult = foodService.getFood();
        return foodResult;
    }
    @GetMapping("/food/view/{foodId}")
    public Food getFood(@PathVariable Long foodId) {
        Optional<Food> foodResult = foodService.getFoodById(String.valueOf(foodId));
        return foodResult.get();
    }
   @PostMapping("/add/food")
    public void addFood(@RequestBody FoodDTO foodInputBean) {
        foodService.addFood(foodInputBean);
    }

    @PutMapping("/edit/food")
    public void editFood(@RequestBody FoodDTO foodInputBean) {
        foodService.editFood(foodInputBean);
    }

}
