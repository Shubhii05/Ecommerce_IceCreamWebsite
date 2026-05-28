import { Route, Switch } from "wouter";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import ProductDetail from "@/pages/ProductDetail";
import Gallery from "@/pages/Gallery";
import Offers from "@/pages/Offers";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Login from "@/pages/Login";

function App() {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        {/* Main Content Area */}
        <div className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/menu" component={Menu} />
            <Route path="/menu/:id" component={ProductDetail} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/offers" component={Offers} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/login" component={Login} />
            
            {/* Fallback route */}
            <Route>
              <div className="min-h-screen flex items-center justify-center pt-16">
                <div className="text-center">
                  <h1 className="font-serif text-4xl font-bold mb-4 text-stone-800">404 - Page Not Found</h1>
                  <Link href="/" className="text-sm font-bold text-rose-500 hover:underline">Go back home</Link>
                </div>
              </div>
            </Route>
          </Switch>
        </div>

        <Footer />
      </div>
    </CartProvider>
  );
}

// Simple link import helper for fallback route
import { Link } from "wouter";

export default App;
