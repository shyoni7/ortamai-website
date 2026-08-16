import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

/**
 * Lazily-loaded Spline 3D scene. The ~2MB runtime chunk is fetched only when
 * this component actually mounts, so pages that never show it pay nothing.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span
            className="w-8 h-8 rounded-full animate-spin"
            style={{ border: '3px solid rgba(200,200,208,0.25)', borderTopColor: '#C8C8D0' }}
          />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
