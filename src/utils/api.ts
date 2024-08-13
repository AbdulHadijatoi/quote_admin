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

async function postData<T>(endpoint: string, data: any): Promise<T> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to post data');
  }

  return response.json();
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

async function postPdf(endpoint: string, data: any): Promise<void> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to post PDF');
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date();
  const timestamp = date.getFullYear().toString() +
                    (date.getMonth() + 1).toString().padStart(2, '0') +
                    date.getDate().toString().padStart(2, '0') +
                    date.getHours().toString().padStart(2, '0') +
                    date.getMinutes().toString().padStart(2, '0') +
                    date.getSeconds().toString().padStart(2, '0') +
                    date.getMilliseconds().toString().padStart(3, '0');
  a.href = url;
  a.download = `shipping_quote_${timestamp}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
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
