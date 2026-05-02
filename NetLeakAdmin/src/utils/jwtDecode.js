/** Giai ma payload JWT (khong verify chu ky) — chi de doc roles tu access token. */
export function decodeJwtPayload(token) {
    if (!token || typeof token !== 'string') return null
    const parts = token.split('.')
    if (parts.length < 2) return null
    try {
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
        const json = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        )
        return JSON.parse(json)
    } catch {
        return null
    }
}
