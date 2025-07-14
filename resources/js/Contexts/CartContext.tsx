// src/contexts/CartContext.tsx
import { Item } from '@/types';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
} from 'react';

const SESSION_KEY = 'cart';

type CartItem = Item & {
    quantity: number;
};

type CartState = {
    items: CartItem[];
};

type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: { product_id: string } }
    | { type: 'CLEAR_CART' };

const CartContext = createContext<{
    state: CartState;
    addItem: (item: CartItem) => void;
    removeItem: (product_id: string) => void;
    clearCart: () => void;
} | null>(null);

const initialState: CartState = {
    items: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(
                (i) => i.product_id === action.payload.product_id,
            );
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.product_id === action.payload.product_id
                            ? {
                                  ...item,
                                  quantity:
                                      item.quantity + action.payload.quantity,
                              }
                            : item,
                    ),
                };
            }

            return { ...state, items: [...state.items, action.payload] };
        }
        case 'REMOVE_ITEM': {
            return {
                ...state,
                items: state.items.filter(
                    (item) => item.product_id !== action.payload.product_id,
                ),
            };
        }
        case 'CLEAR_CART':
            return { items: [] };
        default:
            return state;
    }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const savedCart =
        typeof window !== 'undefined'
            ? sessionStorage.getItem(SESSION_KEY)
            : null;

    const [state, dispatch] = useReducer(
        cartReducer,
        savedCart ? JSON.parse(savedCart) : initialState,
    );

    useEffect(() => {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
    }, [state]);

    const addItem = (item: CartItem) =>
        dispatch({ type: 'ADD_ITEM', payload: item });

    const removeItem = (product_id: string) =>
        dispatch({ type: 'REMOVE_ITEM', payload: { product_id } });

    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    return (
        <CartContext.Provider value={{ state, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};
export default CartContext;
export { cartReducer, initialState };
