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
            // 💡 ملاحظة: يجب أن تتأكد أن ID المنتج هو نفسه في كل مكان
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
                
                // 🛑 الحل: دمج المنتجات الجديدة مع الحفاظ على المخزون المحلي
                if (Object.keys(state.products).length === 0) {
                    // إذا كان الـ State فارغاً (أول مرة تشغيل)، استخدم نتائج API مباشرة
                    state.products = apiResults;
                } else {
                    // إذا كان الـ State يحتوي على بيانات (جاءت من localStorage)، قم بالدمج:
                    for (const category in apiResults) {
                        if (state.products[category]) {
                            // دمج المنتجات في كل فئة
                            state.products[category] = apiResults[category].map(newProduct => {
                                // ابحث عن المنتج القديم (الذي يحمل المخزون المخصوم)
                                const existingProduct = state.products[category].find(p => String(p.id) === String(newProduct.id));
                                
                                // إذا وجدنا المنتج القديم، نستخدم قيمته المخزونة (خصوصاً المخزون)
                                if (existingProduct) {
                                    // نستخدم البيانات الجديدة (للتحديثات مثل الأسعار، الصور، الخ...)
                                    // لكن نحافظ على قيمة المخزون (stock) المحلية المخصومة.
                                    return { ...newProduct, stock: existingProduct.stock };
                                }
                                
                                // إذا كان منتجاً جديداً، أضفه كما هو
                                return newProduct;
                            });
                        } else {
                            // إذا كانت فئة جديدة، أضفها بالكامل
                            state.products[category] = apiResults[category];
                        }
                    }
                }
                
                // 💡 بعد الانتهاء من عملية الدمج/التحديث، نقوم بالحفظ.
                localStorage.setItem("products", JSON.stringify(state.products));
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { decreaseStock, increaseStock } = productsSlice.actions;
export default productsSlice.reducer;