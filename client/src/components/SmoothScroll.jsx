import 'lenis/dist/lenis.css';
import { SmoothScrollProvider } from '../context/SmoothScrollContext';

export default function SmoothScroll({ children }) {
  return <SmoothScrollProvider enabled>{children}</SmoothScrollProvider>;
}
