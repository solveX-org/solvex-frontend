import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('dashboard_token')
  const { pathname } = request.nextUrl
  const isLogin = pathname === '/dashboard/login'

  if (!isLogin && !token) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url))
  }
  if (isLogin && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
