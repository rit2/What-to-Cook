import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Preferences from './pages/Preferences.jsx';
import Ingredients from './pages/Ingredients.jsx';
import MealPlan from './pages/MealPlan.jsx';
import GroceryList from './pages/GroceryList.jsx';
import Favorites from './pages/Favorites.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="preferences" element={<Preferences />} />
          <Route path="ingredients" element={<Ingredients />} />
          <Route path="meal-plan" element={<MealPlan />} />
          <Route path="grocery-list" element={<GroceryList />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
