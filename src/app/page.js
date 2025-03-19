'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    if (window) {
      if (localStorage.getItem('name') || sessionStorage.getItem('name')) {
        router.push('/pages/main');
      } else {
        router.push('/pages/login');
      };
    };
  }, []);

  return (
    <div className={styles.page}>
    </div>
  );
}
