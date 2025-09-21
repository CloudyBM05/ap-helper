// API Configuration for AP Helper
// This file centralizes all API endpoint configurations

const isDevelopment = import.meta.env.DEV;

// Your Heroku backend URL
const PRODUCTION_API_BASE = 'https://ap-helper-2d9f117e9bdb.herokuapp.com';
const DEVELOPMENT_API_BASE = 'http://localhost:8080'; // Local development

export const API_BASE_URL = isDevelopment ? DEVELOPMENT_API_BASE : PRODUCTION_API_BASE;

// API Endpoints
export const API_ENDPOINTS = {
  // Essay grading endpoints
  GRADE_SAQ: `${API_BASE_URL}/api/grade-saq`,
  GRADE_DBQ: `${API_BASE_URL}/api/grade-dbq`,
  GRADE_LEQ: `${API_BASE_URL}/api/grade-leq`,
  GRADE_AAQ: `${API_BASE_URL}/api/grade-aaq`,
  GRADE_EBQ: `${API_BASE_URL}/api/grade-ebq`,
  GRADE_ESSAY: `${API_BASE_URL}/api/grade_essay`,
  GRADE_AP_SEMINAR: `${API_BASE_URL}/api/grade-ap-seminar`,
  
  // Government grading endpoints
  GRADE_GOV_CONCEPT: `${API_BASE_URL}/api/grade-gov-concept`,
  GRADE_GOV_QUANTITATIVE: `${API_BASE_URL}/api/grade-gov-quantitative`,
  GRADE_GOV_SCOTUS: `${API_BASE_URL}/api/grade-gov-scotus`,
  GRADE_GOV_ARGUMENT: `${API_BASE_URL}/api/grade-gov-argument`,
  
  // Human Geography endpoints
  GRADE_HUG_CONCEPT: `${API_BASE_URL}/api/grade-hug-concept`,
  GRADE_HUG_SPATIAL: `${API_BASE_URL}/api/grade-hug-spatial`,
  GRADE_HUG_SCALE: `${API_BASE_URL}/api/grade-hug-scale`,
};

// Default fetch options for API calls
export const DEFAULT_FETCH_OPTIONS: RequestInit = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Include cookies for CORS
};

// Helper function to make API calls
export const makeAPICall = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(endpoint, {
      ...DEFAULT_FETCH_OPTIONS,
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
