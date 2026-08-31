"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { SignupForm } from '../../components/auth/AuthForms';
import styles from '../../components/auth/AuthForm.module.css';

export default function SignupPage() {
  return (
    <main style={{ backgroundColor: 'var(--navy)' }}>
      <Navbar />
      <div className={styles.standaloneContainer}>
        <div className={styles.standaloneCard}>
          <SignupForm />
        </div>
      </div>
      <Footer />
    </main>
  );
}
