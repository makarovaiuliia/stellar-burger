import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { RootState, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const allIngredients = useSelector(
    (state: RootState) => state.ingredients.items
  );
  const { id } = useParams<{ id: string }>();

  const ingredientData = useMemo(
    () => allIngredients.find((ingredient) => ingredient._id === id),
    [allIngredients, id]
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
