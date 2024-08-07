import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';


const nextIntlMiddleware = createMiddleware({
    locales:['en','de','ar'],
    defaultLocale:'en'
})
// eslint-disable-next-line import/no-anonymous-default-export
export default function (req: NextRequest): NextResponse{
    return nextIntlMiddleware(req)
}


export const config = {
  // Match only internationalized pathnames
    matcher: ['/', '/(de|en|ar)/:path*']
};