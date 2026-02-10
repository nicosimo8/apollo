'use server'

import fs from 'fs';

export const readFile = async (serial) => {
  console.log(serial)
  const data = new Promise((resolve, reject) => {
    fs.readFile(`/home/Argos/${serial}.licence`, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        reject('Error reading file: ', err);
        return;
      }
      resolve(data);
    });
  });
  return data;
};
