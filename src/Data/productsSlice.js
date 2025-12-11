// productsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all categories products (يظل كما هو)
export const fetchAllProducts = createAsyncThunk(
"products/fetchAll",

  async () => {

    const categories = [

      "smartphones",

      "mobile-accessories",

      "laptops",

      "tablets",

      "mens-watches",

      "womens-watches",

    ];



    const results = {};



    for (const cat of categories) {

      const res = await fetch(`https://dummyjson.com/products/category/${cat}`);

      const data = await res.json();

      results[cat] = data.products;

    }



    return { results, categories };

  }

);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: localStorage.getItem("products")
            ? JSON.parse(localStorage.getItem("products"))
            : {},
        categories: [],
        loading: false,
    },

    reducers: {
        decreaseStock: (state, action) => {
            const { id, quantity } = action.payload;
            for (const cat in state.products) {
                const product = state.products[cat].find((p) => String(p.id) === String(id));
                if (product) {
                    product.stock = Math.max(product.stock - quantity, 0);
                    break;
                }
            }
            localStorage.setItem("products", JSON.stringify(state.products));
        },

        increaseStock: (state, action) => {
            const { id, quantity } = action.payload;
            for (const cat in state.products) {
                const p = state.products[cat].find(x => String(x.id) === String(id));
                if (p) {
                    p.stock += quantity;
                }
            }
            localStorage.setItem("products", JSON.stringify(state.products));
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.categories;
                
                const apiResults = action.payload.results;
                
 
                if (Object.keys(state.products).length === 0) {
                   
                    state.products = apiResults;
                } else {
                    for (const category in apiResults) {
                        if (state.products[category]) {
                         
                            state.products[category] = apiResults[category].map(newProduct => {
                              
                                const existingProduct = state.products[category].find(p => String(p.id) === String(newProduct.id));
                                
                               
                                if (existingProduct) {
                                    
                                    return { ...newProduct, stock: existingProduct.stock };
                                }
                                
                             
                                return newProduct;
                            });
                        } else {
                             
                            state.products[category] = apiResults[category];
                        }
                    }
                }
                
                localStorage.setItem("products", JSON.stringify(state.products));
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { decreaseStock, increaseStock } = productsSlice.actions;
export default productsSlice.reducer;