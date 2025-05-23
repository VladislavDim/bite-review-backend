import * as restaurantService from '../services/restaurant.service.js';

/**
 * GET /api/restaurants
 * Returns all restaurants with related city and owner
 */
export const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await restaurantService.getAllRestaurants();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch restaurants', errorMessage: error.message });
    }
};

/**
 * GET /api/restaurants/:id
 * Returns restaurant with current id
 */
export const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await restaurantService.getRestaurantById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch restaurant', errorMessage: error.message });
    }
};

/**
 * POST /api/restaurants/upload
 * Upload restaurant image and return imageUrl
 */
export const uploadRestaurantImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(201).json({ imageUrl });
};

/**
 * POST /api/restaurants
 * Creates a new restaurant
 */
export const createRestaurant = async (req, res) => {
    try {
        const newRestaurant = await restaurantService.createRestaurant(req.body, req.user._id);
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create restaurant', errorMessage: error.message });
    }
};

/**
 * PUT /api/restaurants/:id
 * Update an existing restaurant
 */
export const updateRestaurant = async (req, res) => {
    try {
        const updated = await restaurantService.updateRestaurant(
            req.params.id,
            req.body,
            req.user._id
        );

        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update restaurant', errorMessage: error.message });
    }
};

/**
 * DELETE /api/restaurants/:id
 * Delete a restaurant
 */
export const deleteRestaurant = async (req, res) => {
    try {
        const deleted = await restaurantService.deleteRestaurant(
            req.params.id,
            req.user._id
        );

        res.json({ deleted, message: 'Restaurant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete restaurant', errorMessage: error.message });
    }
};
