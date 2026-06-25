// Tiny shared store so the Lenis scroll progress (DOM side) can be read
// inside the R3F render loop (useFrame) without React re-renders per frame.
export const scroll = { progress: 0 };

// Progress reserved for the image hero — the 3D hauler stays hidden below this
// and fades in over the next ~0.09 of scroll.
export const HERO = 0.14;
