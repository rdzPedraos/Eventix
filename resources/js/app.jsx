import './bootstrap';
import '../css/app.css';

import React from 'react'
import {createRoot} from 'react-dom/client'
import {createInertiaApp } from '@inertiajs/react'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx')
    return pages[`./Pages/${name}.jsx`]()
  },
  setup({ el, App, props }) {
    createRoot(el).render( <App {...props} /> )
  },
})
