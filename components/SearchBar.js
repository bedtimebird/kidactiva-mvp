"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import SearchBar from '../components/SearchBar'; // Import the component

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>KidActiva - Find Your Child's Next Adventure</title>
        <meta name="description" content="Discover and book kids' activities in Vancouver" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          Find Your Child's Next Adventure in Vancouver
        </h1>

        {/* This is where you render the component */}
        <SearchBar />
      </main>
    </div>
  );
}