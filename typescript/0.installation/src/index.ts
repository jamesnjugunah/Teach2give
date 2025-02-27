// type rectangle = {
//     width: number;
//     height: number;

// }
// const getRectangleArea = (rectangle: rectangle) => {
//     return rectangle.width * rectangle.height
// }
// const getPerimeter = (rectangle:rectangle) => {
//     return 2 * (rectangle.width + rectangle.height)
// }
// const rec1 = {
//     width:10,
//     height:20
// }
// console.log(getPerimeter(rec1))
// console.log(getRectangleArea(rec1))
type ingredients={ 
    name: string; 
    quantity: string 
}

type Recipe = {
    title: string;
    instructions: string;
    ingredients: Array<ingredients>;
    
  };
  
  const processRecipe = (recipe: Recipe) => {
    // Do something with the recipe in here
  };
  
  console.log(processRecipe({
    title: "Chocolate Chip Cookies",
    ingredients: [
      { name: "Flour", quantity: "2 cups" },
      { name: "Sugar", quantity: "1 cup" },
    ],
    instructions: "...",
  }));
   