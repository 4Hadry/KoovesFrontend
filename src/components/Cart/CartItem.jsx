import { Link } from "react-router-dom";
import { CiSquareRemove } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { server } from "../../redux/store";

const CartItem = ({ cartItem, increment, decrement, remove }) => {
  const { photo, productId, name, price, quantity } = cartItem;
  return (
    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" class="shrink-0 md:order-1">
          <img
            class="h-20 w-20 dark:hidden"
            src={`${server}/${photo}`}
            alt={name}
          />
        </a>

        <label for="counter-input" class="sr-only">
          Choose quantity:
        </label>
        <div class="flex items-center justify-between md:order-3 md:justify-end">
          <div class="flex items-center">
            <button
              type="button"
              id="decrement-button"
              data-input-counter-decrement="counter-input"
              class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              onClick={() => decrement(cartItem)}
            >
              -
            </button>
            <input
              type="text"
              id="counter-input"
              data-input-counter
              class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
              placeholder=""
              value={quantity}
              required
            />
            <button
              type="button"
              id="increment-button"
              data-input-counter-increment="counter-input"
              class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              onClick={() => increment(cartItem)}
            >
              +
            </button>
          </div>
          <div class="text-end md:order-4 md:w-32">
            <p class="text-base font-bold text-gray-900 dark:text-white">
              {price}
            </p>
          </div>
        </div>

        <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <Link
            to={`/product/${productId}`}
            class="text-base font-medium text-gray-900 hover:underline dark:text-white"
          >
            {name}
          </Link>

          <div class="flex items-center gap-4">
            <button
              type="button"
              class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            >
              <MdFavoriteBorder className="text-[20px]" />
              Add to Favorites
            </button>

            <button
              type="button"
              class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
              onClick={() => remove(productId)}
            >
              <CiSquareRemove className="text-[20px]" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>

    //   <div className="cart-itm">
    //     <img src={photo} alt={name} />
    //     <article>
    //       <Link to={`/product/${productId}`}>{name}</Link>
    //       <span>${price}</span>
    //     </article>
    //     <div className="">
    //       <button>-</button>
    //       <p>{quantity}</p>
    //       <button>+</button>
    //     </div>

    //     <button>
    //       <FaTrash />
    //     </button>
    //   </div>
  );
};

export default CartItem;
