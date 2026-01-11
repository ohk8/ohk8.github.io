import Link from 'next/link'

export default function Custom404() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#ffffff',
            color: '#000000',
            textAlign: 'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            <h1 style={{ fontSize: '80px', fontWeight: '600', margin: '0', letterSpacing: '-2px' }}>4 0 4</h1>
            <div style={{ width: '40px', height: '2px', backgroundColor: '#000', margin: '20px 0' }}></div>
            <h2 style={{ fontSize: '20px', fontWeight: '400', margin: '0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Page Not Found
            </h2>
            <p style={{ fontSize: '14px', marginTop: '15px', color: '#888', lineHeight: '1.6' }}>
                요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </p>
            <Link href="/" style={{
                marginTop: '35px',
                padding: '12px 24px',
                backgroundColor: '#000',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 'bold',
                borderRadius: '4px'
            }}>
                BACK TO HOME
            </Link>
        </div>
    )
}