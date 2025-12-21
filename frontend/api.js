// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Get auth token from localStorage
function getAuthToken() {
    return localStorage.getItem('token');
}

// Get user info from localStorage
function getUserInfo() {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
}

// Set auth headers
function getAuthHeaders() {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
}

// API Functions

// Books API
const BooksAPI = {
    // Get all books
    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/books`);
            if (!response.ok) throw new Error('Failed to fetch books');
            return await response.json();
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    },

    // Get book by ID
    getById: async (bookId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/books/${bookId}`);
            if (!response.ok) throw new Error('Book not found');
            return await response.json();
        } catch (error) {
            console.error('Error fetching book:', error);
            throw error;
        }
    },

    // Search books by title or author
    search: async (title = '', author = '') => {
        try {
            const params = new URLSearchParams();
            if (title) params.append('title', title);
            if (author) params.append('author', author);
            
            const response = await fetch(`${API_BASE_URL}/books/search?${params}`);
            if (!response.ok) throw new Error('Search failed');
            return await response.json();
        } catch (error) {
            console.error('Error searching books:', error);
            throw error;
        }
    },

    // Get books by category
    getByCategory: async (category) => {
        try {
            const response = await fetch(`${API_BASE_URL}/books/category/${category}`);
            if (!response.ok) throw new Error('Failed to fetch books by category');
            return await response.json();
        } catch (error) {
            console.error('Error fetching books by category:', error);
            throw error;
        }
    },

    // Add new book (Admin only)
    add: async (bookData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/books`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(bookData)
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to add book');
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding book:', error);
            throw error;
        }
    },

    // Update book (Admin only)
    update: async (bookId, bookData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/books/${bookId}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(bookData)
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to update book');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating book:', error);
            throw error;
        }
    },

    // Delete book (Admin only)
    delete: async (bookId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/books/${bookId}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to delete book');
            }
            return await response.json();
        } catch (error) {
            console.error('Error deleting book:', error);
            throw error;
        }
    }
};

// Categories API
const CategoriesAPI = {
    // Get all categories
    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/categories`);
            if (!response.ok) throw new Error('Failed to fetch categories');
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    // Get category by ID
    getById: async (categoryId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`);
            if (!response.ok) throw new Error('Category not found');
            return await response.json();
        } catch (error) {
            console.error('Error fetching category:', error);
            throw error;
        }
    },

    // Add new category (Admin only)
    add: async (categoryData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/categories`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(categoryData)
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to add category');
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding category:', error);
            throw error;
        }
    },

    // Update category (Admin only)
    update: async (categoryId, categoryData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(categoryData)
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to update category');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating category:', error);
            throw error;
        }
    },

    // Delete category (Admin only)
    delete: async (categoryId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to delete category');
            }
            return await response.json();
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    }
};

// Cart API
const CartAPI = {
    // Get cart by ID
    getById: async (cartId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/${cartId}`);
            if (!response.ok) throw new Error('Cart not found');
            return await response.json();
        } catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    },

    // Create new cart
    create: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error('Failed to create cart');
            return await response.json();
        } catch (error) {
            console.error('Error creating cart:', error);
            throw error;
        }
    },

    // Add item to cart
    addItem: async (cartId, bookId, quantity) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/${cartId}/items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookId, quantity })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to add item to cart');
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding item to cart:', error);
            throw error;
        }
    },

    // Delete item from cart
    deleteItem: async (cartId, bookId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/${cartId}/${bookId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to delete item from cart');
            }
            return await response.json();
        } catch (error) {
            console.error('Error deleting item from cart:', error);
            throw error;
        }
    }   
};

// Users API
const UsersAPI = {
    // Signup
    signup: async (userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Signup failed');
            }
            return await response.json();
        } catch (error) {
            console.error('Error during signup:', error);
            throw error;
        }
    },

    // Login
    login: async (credentials) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Login failed');
            }
            return await response.json();
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },

    // Get all users (Admin only)
    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                headers: getAuthHeaders()
            });
            if (!response.ok) throw new Error('Failed to fetch users');
            return await response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
};

// Export APIs
window.BooksAPI = BooksAPI;
window.CategoriesAPI = CategoriesAPI;
window.CartAPI = CartAPI;
window.UsersAPI = UsersAPI;
window.getAuthToken = getAuthToken;
window.getUserInfo = getUserInfo;
