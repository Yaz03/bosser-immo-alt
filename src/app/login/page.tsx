"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { LoginForm } from '../../components/auth/AuthForms';
import styles from '../../components/auth/AuthForm.module.css';

export default function LoginPage() {
  return (
    <main style={{ backgroundColor: 'var(--navy)' }}>
      <Navbar />
      <div className={styles.standaloneContainer}>
        <div className={styles.standaloneCard}>
          <LoginForm />
        </div>
      </div>
      <Footer />
    </main>
  );
}
