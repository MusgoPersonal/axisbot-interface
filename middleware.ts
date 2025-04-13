import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Middleware para manejar CORS en todas las solicitudes
export function middleware(request: NextRequest) {
  // Obtener la respuesta original
  const response = NextResponse.next()

  // Agregar encabezados CORS a todas las respuestas
  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, x-api-token, x-api-builderbot")

  // Si es una solicitud OPTIONS (preflight), responder inmediatamente
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-token, x-api-builderbot",
        "Access-Control-Max-Age": "86400", // 24 horas
      },
    })
  }

  return response
}

// Configurar el middleware para ejecutarse solo en rutas de API
export const config = {
  matcher: "/api/:path*",
}
