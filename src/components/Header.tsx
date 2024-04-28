import { useMemo } from "react";
import { TCartItem, TGuitar } from "../types";

type THeaderProps = {
  cart: TCartItem[];
  removeFromCart: (items: Pick<TGuitar, "id">) => void;
  increaseQuantity: (items: Pick<TGuitar, "id">) => void;
  decreaseQuantity: (items: Pick<TGuitar, "id">) => void;
  setCart:  React.Dispatch<React.SetStateAction<TCartItem[]>>
}



const Header = ({cart, removeFromCart, increaseQuantity, decreaseQuantity, setCart} : THeaderProps) => {

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(() => cart.reduce( (total : number, item : TCartItem) => total + (item.price * item.quantity), 0), [cart]);

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="./public/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="./public/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                { isEmpty ? (
                  <p className="text-center">El carrito esta vacio</p>
                )
                :
                (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                    <tbody>
                      {cart.map( ({id, image, name, price, quantity}) => (
                      <tr key={id}>
                        <td>
                          <img
                            className="img-fluid"
                            src={`./public/img/${image}.jpg`}
                            alt="imagen guitarra"
                          />
                        </td>
                        <td>{name}</td>
                        <td 
                          className="fw-bold">
                            ${price}
                        </td>
                        <td className="flex align-items-start gap-4">
                          <button 
                            onClick={() => decreaseQuantity({id})}
                            type="button" 
                            className="btn btn-dark"
                          >
                            -
                          </button>
                          {quantity}
                          <button 
                            onClick={() => increaseQuantity({id})}
                            type="button" 
                            className="btn btn-dark"
                          >
                            +
                          </button>
                        </td>
                        <td>
                          <button 
                            onClick={() => removeFromCart({id})} 
                            className="btn btn-danger" 
                            type="button"
                          >
                            X
                          </button>
                        </td>
                      </tr>
                      ))}
                    </tbody>
                    </table>
                    <p className="text-end">
                      Total pagar: <span className="fw-bold">${cartTotal}</span>
                    </p>
                  </>
                )}
                <button 
                  onClick={() => setCart([])}
                  className="btn btn-dark w-100 mt-3 p-2" 
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
