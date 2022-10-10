import HomePage from "./components/home/HomePage";
import SearchPage from "./components/Search/SearchPage";
import {Routes,Route} from 'react-router-dom';
import RestaurantPage from "./components/restaurant/RestaurantPage";

function App() {
  return <>

  <main class="container-fluid">
    <Routes>
      <Route path="/" element={  <HomePage/>}/>
      <Route path="/Search-page/:meal_id" element = {<SearchPage/>}/>
      <Route path="/restaurant/:id" element = {<RestaurantPage/>}/>
    </Routes>
  </main>

  </>
};

export default App;
