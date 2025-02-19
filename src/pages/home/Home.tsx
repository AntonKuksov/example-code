import IngredientCard from "../../components/ingredient/card/IngredientCard.tsx";
import PopularList from "../../components/shared/PopularList.tsx";
import Welcome from "./Welcome.tsx";

export default function Home() {
  return (
    <div>
      <Welcome />
      <PopularList
        key="ingredient-list"
        name="ingredients"
        card={IngredientCard}
      />
      {/*<PopularList key="card-list" name="card" card={ProductCard} />*/}
    </div>
  );
}
