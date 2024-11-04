'use client'


import { Suspense } from 'react';
import UpdateFormContent from './UpdateFormContent'
export default function EditEventsPage() {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <UpdateFormContent />
        </Suspense>
      );
    }