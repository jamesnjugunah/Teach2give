type rectangle = {
    width: number;
    height: number;

}
const getRectangleArea = (rectangle: rectangle) => {
    return rectangle.width * rectangle.height
}
const getPerimeter = (rectangle:rectangle) => {
    return 2 * (rectangle.width + rectangle.height)
}
const rec1 = {
    width:10,
    height:20
}
console.log(getPerimeter(rec1))
console.log(getRectangleArea(rec1))