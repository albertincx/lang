import React, { lazy, Suspense } from 'react';
import Loader from '../components/Loading/Loader';

const loadable = (c, { fb = Loader } = { fb: null }) => {
  const Lc = lazy(c);
  return props => (
    <Suspense fallback={fb}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Lc {...props} />
    </Suspense>
  );
};

export default ({ loader }) => loadable(loader);
