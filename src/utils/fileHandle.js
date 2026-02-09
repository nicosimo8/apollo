'use server'

import fs from 'fs';

export const readFile = async (serial) => {
  const data = new Promise((resolve, reject) => {
    fs.readFile(`/home/Argos/${serial}.licence`, 'utf8', (err, data) => {
      if (err) {
        reject('Error reading file:', err.message);
        return;
      }
      resolve(data);
    });
  });
  return data;
};
