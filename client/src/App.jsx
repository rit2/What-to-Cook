import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Preferences from './pages/Preferences.jsx';
import Ingredients from './pages/Ingredients.jsx';
import MealPlan from './pages/MealPlan.jsx';
import GroceryList from './pages/GroceryList.jsx';
import Favorites from './pages/Favorites.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="preferences" element={<Preferences />} />
            <Route path="ingredients" element={<Ingredients />} />
            <Route path="meal-plan" element={<MealPlan />} />
            <Route path="grocery-list" element={<GroceryList />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
