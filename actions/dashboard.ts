import axios from 'axios';

export async function getDashboardData() {
  try {
    const response = await axios.get('/api/dashboard');

    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
}
