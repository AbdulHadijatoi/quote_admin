// src/utils/api.ts

import {baseUrl} from './config';

async function getData<T>(endpoint: string): Promise<T> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

async function postData<T>(endpoint: string, formData: FormData): Promise<T> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // Do not set Content-Type when sending FormData
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to post data');
  }

  return response.json(); // Return the JSON response
}


async function getPdf(endpoint: string): Promise<void> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch PDF');
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}

async function postPdf(endpoint: string, data: FormData): Promise<void> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // Do not set 'Content-Type' for FormData; let the browser set it automatically
    },
    body: data,
  });

  if (!response.ok) {
    throw new Error('Failed to post PDF');
  }

  // Check for correct Content-Type
  const contentType = response.headers.get('Content-Type');
  if (!contentType || !contentType.includes('application/pdf')) {
    throw new Error('The server did not return a PDF');
  }

  // Create a blob from the response
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  // Create a link element
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;

  // Set a default filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  a.download = `shipping_quote_${timestamp}.pdf`;

  // Append the link to the document body
  document.body.appendChild(a);
  a.click(); // Trigger the download

  // Clean up the URL object and remove the link
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}



async function uploadImage<T>(endpoint: string, formData: FormData): Promise<T> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  return response.json();
}

// Common export for all functions
export { getData, postData, getPdf, postPdf, uploadImage };



// ***** Call Examples *****
// Fetching Data:
// const data = await getData<MyType>('my-endpoint');
// Posting Data:
// const response = await postData<MyType>('my-endpoint', { key: 'value' });
// Previewing PDF:
// await getPdf('my-pdf-endpoint');
// Downloading PDF:
// await postPdf('my-pdf-endpoint', { key: 'value' });


// Model example for response format
// interface User {
//     id: number;
//     name: string;
//     email: string;
// }
  
// const data = await getData<User[]>('my-endpoint');



// In other files call like this
// import { getData, postData, getPdf, postPdf } from 'src/utils/api';

// const fetchData = async () => {
//   const data = await getData<MyType>('my-endpoint');
//   // Handle the data
// };

// const sendData = async () => {
//   const response = await postData<MyType>('my-endpoint', myPayload);
//   // Handle the response
// };

// const previewPdf = async () => {
//   await getPdf('pdf-endpoint');
//   // PDF will open in a new tab
// };

// const downloadPdf = async () => {
//   await postPdf('pdf-endpoint', myPayload);
//   // PDF will be downloaded
// };
