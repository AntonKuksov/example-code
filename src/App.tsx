import { Route, Routes } from "react-router-dom";
import Articles from "./components/article/list/Articles.tsx";
import ArticleView from "./components/article/page/ArticleView.tsx";
import Brands from "./components/brand/list/Brands.tsx";
import { BrandInfo } from "./components/brand/page/BrandInfo.tsx";
import Ingredients from "./components/ingredient/list/Ingredients.tsx";
import IngredientInfo from "./components/ingredient/page/IngredientInfo.tsx";
import Products from "./components/product/list/Products.tsx";
import ProductInfo from "./components/product/page/ProductInfo.tsx";
import Login from "./components/user/pages/Login.tsx";
import Profile from "./components/user/pages/Profile.tsx";
import Signup from "./components/user/pages/Signup.tsx";
import Layout from "./layout/Layout.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Home from "./pages/home/Home.tsx";
import Search from "./pages/Search.tsx";
import "./App.css";
import "./styles/custom.css";
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/ingredient" element={<IngredientInfo />} />

        <Route path="/products" element={<Products />} />
        <Route path="/product" element={<ProductInfo />} />

        <Route path="/brands" element={<Brands />} />
        <Route path="/brand" element={<BrandInfo />} />

        <Route path="/articles" element={<Articles />} />
        <Route path="/article" element={<ArticleView />} />

        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
