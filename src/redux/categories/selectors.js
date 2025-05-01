export const getCategories = state =>
  state.categories || {
    expenses: [],
    income: [],
  };

export const getExpenseCategories = state => state.categories?.expenses || [];

export const getIncomeCategories = state => state.categories?.income || [];

export const areCategoriesLoaded = state => {
  const categories = state.categories;
  return Boolean(
    categories &&
      (categories.expenses?.length > 0 || categories.income?.length > 0)
  );
};
