import React from "react";
import { Route, Routes } from "react-router-dom";
import { ClientLayout } from "../layouts";
import { Home, Post, Contacts, Courses, Blog } from "../pages/web";

export function WebRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };
  return (
    <Routes>
      <Route path="/" element={loadLayout(ClientLayout, Home)} />
      <Route path="/courses" element={loadLayout(ClientLayout, Courses)} />
      <Route path="/contact" element={loadLayout(ClientLayout, Contacts)} />
      <Route path="/blog" element={loadLayout(ClientLayout, Blog)} />
      <Route path="/blog/:path" element={loadLayout(ClientLayout, Post)} />
    </Routes>
  );
}
