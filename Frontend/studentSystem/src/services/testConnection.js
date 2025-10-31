// Test connection in your frontend
const testConnection = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/auth/test');
    const data = await response.json();
    console.log('Backend response:', data);
    return data;
  } catch (error) {
    console.error('Connection failed:', error);
  }
};

// Call this function when your app loads
testConnection();