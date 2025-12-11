import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const normalizeRole = (r) => (r || "user").toString().trim().toLowerCase();


export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/users/verify", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        return thunkAPI.rejectWithValue("User not authenticated");
      }

      const data = await res.json();
      const role = normalizeRole(data?.user?.role);

      return { ...data.user, role };
    } catch (err) {
      return thunkAPI.rejectWithValue("Auth check failed");
    }
  }
);

// تسجيل الدخول
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data?.message || "Login failed");
      }

      const role = normalizeRole(data?.user?.role);
      return { ...data.user, role };
    } catch (err) {
      return thunkAPI.rejectWithValue("Login failed");
    }
  }
);

// التسجيل
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data?.message || "Register failed");
      }

      const role = normalizeRole(data?.user?.role);
      return { ...data.user, role };
    } catch (err) {
      return thunkAPI.rejectWithValue("Register failed");
    }
  }
);

// تسجيل الخروج
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await fetch("http://localhost:5000/users/logout", {
        method: "POST",
        credentials: "include",
      });
      return null;
    } catch (err) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

// ---- Slice ----
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true, 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Check auth
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true; // ✅ مهم جدًا
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
