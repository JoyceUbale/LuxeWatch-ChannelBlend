import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Define initial state
const initialState = {
  products: [],
  cart: [],
  selectedProduct: null,
};

// Create actions
const ACTIONS = {
  SET_PRODUCTS: 'set-products',
  ADD_TO_CART: 'add-to-cart',
  REMOVE_FROM_CART: 'remove-from-cart',
  UPDATE_QUANTITY: 'update-quantity',
  SET_SELECTED_PRODUCT: 'set-selected-product',
  CLEAR_SELECTED_PRODUCT: 'clear-selected-product',
};

// Create reducer
const productReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PRODUCTS:
      return { ...state, products: action.payload.products };

      case ACTIONS.ADD_TO_CART: {
        const { product } = action.payload;
      
        // Convert _id to string for proper comparison
        const productId = product._id.toString();
        const selectedColor = product.selectedColor || "default"; // Ensure color is always checked
      
        // Find an existing item with the same _id and color
        const existingItemIndex = state.cart.findIndex(
          (item) => item._id.toString() === productId && item.selectedColor === selectedColor
        );
      
        if (existingItemIndex >= 0) {
          // If item with same _id and color exists, update quantity
          const updatedCart = [...state.cart];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: (updatedCart[existingItemIndex].quantity || 1) + (product.quantity || 1),
          };
          return { ...state, cart: updatedCart };
        } else {
          // Add new item with selected color
          return {
            ...state,
            cart: [...state.cart, { ...product, quantity: product.quantity || 1, selectedColor }],
          };
        }
      }
      
      
      
    
    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id)
      };
      
    case ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // If quantity is 0 or less, remove the item
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== id)
        };
      }
      
      // Otherwise update the quantity
      return {
        ...state,
        cart: state.cart.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      };
    }
    
    case ACTIONS.SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload.product
      };
      
    case ACTIONS.CLEAR_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: null
      };
      
    default:
      return state;
  }
};

// Create context
const ProductContext = createContext();

// Create provider component
export const ProductProvider = ({ children }) => {
  // Initialize state with data from localStorage if available
  const [state, dispatch] = useReducer(productReducer, initialState, () => {
    const localData = localStorage.getItem('luxewatch-cart');
    return localData ? { ...initialState, cart: JSON.parse(localData) } : initialState;
  });

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/products');
        dispatch({ type: ACTIONS.SET_PRODUCTS, payload: { products: data } });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('luxewatch-cart', JSON.stringify(state.cart));
  }, [state.cart]);
  
  // Actions
  const addToCart = (product) => {
    dispatch({ 
      type: ACTIONS.ADD_TO_CART, 
      payload: { product } 
    });
  };
  
  const removeFromCart = (id) => {
    dispatch({ 
      type: ACTIONS.REMOVE_FROM_CART, 
      payload: { id } 
    });
  };
  
  const updateQuantity = (id, quantity) => {
    dispatch({ 
      type: ACTIONS.UPDATE_QUANTITY, 
      payload: { id, quantity } 
    });
  };
  
  const setSelectedProduct = (product) => {
    dispatch({ 
      type: ACTIONS.SET_SELECTED_PRODUCT, 
      payload: { product } 
    });
  };
  
  const clearSelectedProduct = () => {
    dispatch({ type: ACTIONS.CLEAR_SELECTED_PRODUCT });
  };
  
  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        selectedProduct: state.selectedProduct,
        addToCart,
        removeFromCart,
        updateQuantity,
        setSelectedProduct,
        clearSelectedProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Create custom hook
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
