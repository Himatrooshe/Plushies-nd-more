import {Navigate} from 'react-router';

export default function AboutRedirect() {
  return <Navigate to="/pages/about" replace />;
}

export const meta = () => [{title: 'About Us | Plushies & More'}];

/** @typedef {import('./+types/about').Route} Route */

