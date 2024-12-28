import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 40,
  height: 40,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #7C3AED, #4ADE80)", // Gradient background
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%', // Circular shape
          color: 'white',
          fontWeight: 'bold',
          fontSize: 18,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        EC
      </div>
    ),
    {
      ...size,
    }
  )
}
