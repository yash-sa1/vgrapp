import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/rental-store';

export const getAllVideoGames = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/videogames`);
        return response.data;
    } catch (error) {
        console.error('Error fetching video games:', error);
        throw error;
    }
};

export const rentGame = async (customerId: number, gameTitle: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/rent-game`, {
            customerId,
            gameTitle,
        });
        return { success: true, message: response.data };
    } catch (error) {
        console.error('Error renting game:', error);
        return { success: false, message: 'Failed to rent game' };
    }
};

export const returnGame = async (name: string, customerID: number, title: string, givenrentalID: string) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/return-game`, {
            name,
            customerID,
            title,
            givenrentalID,
        });
        return { success: true, message: response.data };
    } catch (error) {
        console.error('Error returning game:', error);
        return { success: false, message: 'Failed to return game' };
    }
};

export const registerCustomer = async (name: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register-customer`, name, {
            headers: {
                'Content-Type': 'text/plain',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error registering customer:', error);
        throw error;
    }
};

export const getAllCustomers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/customers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};

export const getMyRentals = async (customerID: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/my-rentals`, {
            params: {
                customerID
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching rentals:', error);
        throw error;
    }
};

