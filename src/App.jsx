import { useEffect, useState } from 'react'
import './index.css'


// Componentes
import { Header } from './components/header';
import { Footer } from './components/footer'
import { Guitar } from './components/guitar'

// Base de datos
import { db } from './data/db'

function App() {

  // Inicializar carrito desde localStorage
  function initCart() {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initCart);

  useEffect (() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  // Agregar al carrito
  function addToCart(guitar) {
    const itemsIndex = cart.findIndex((item) => guitar.id === item.id);
    if (itemsIndex === -1) {
      guitar.quantity = 1;
      setCart([...cart, guitar])
    } else {
      const updatedCart = [...cart];
      updatedCart[itemsIndex].quantity ++;
      setCart(updatedCart);
    }
  }

  // Calcular total
  function calculateTotal() {
    let total = 0;
    for (const guitar of cart) {
      total += guitar.price * guitar.quantity;
    }
    return total;
  }

  // Actualizar cantidad
  function updateQuantity(id, operation) {
    const itemsIndex = cart.findIndex((item) => id === item.id);
    if (itemsIndex !== -1) {
      const updatedCart = [...cart];
      if (operation === 'increment') {
        updatedCart[itemsIndex].quantity ++;
      } else if (operation === 'decrement' && updatedCart[itemsIndex].quantity > 1) {
        updatedCart[itemsIndex].quantity --;
      }
      setCart(updatedCart);
    }
  }

  // Eliminar del carrito
  function removeFromCart(id) {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  }

  // Vaciar carrito
  function clearCart() {
    setCart([]);
  }


  return (
    <>
      <Header
       cart={cart} 
       total={calculateTotal()} 
       clearCart={clearCart} 
       updateQuantity={updateQuantity} 
       removeFromCart={removeFromCart} />
       
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {data.map((guitar) => (
            <Guitar
              addToCart={addToCart}
              key={guitar.id}
              guitar={guitar}
            />
          ))}

        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
