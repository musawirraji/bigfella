// Tiny shared store so the Lenis scroll progress (DOM side) can be read
// inside the R3F render loop (useFrame) without React re-renders per frame.
export const scroll = { progress: 0 };
