"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ForgotPasswordForm } from '../../components/auth/AuthForms';
import styles from '../../components/auth/AuthForm.module.css';

export default function ForgotPasswordPage() {
  return (
    <main style={{ backgroundColor: 'var(--navy)' }}>
      <Navbar />
      <div className={styles.standaloneContainer}>
        <div className={styles.standaloneCard}>
          <ForgotPasswordForm />
        </div>
      </div>
      <Footer />
    </main>
  );
}
