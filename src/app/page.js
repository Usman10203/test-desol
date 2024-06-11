'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1>Welcome to Car Selling Services</h1>
        <p>Click here to login</p>
        <button onClick={handleLoginClick} style={{ padding: '10px 40px', fontSize: '16px', backgroundColor: '#0096FF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
      </div>
    </>
  );
}
