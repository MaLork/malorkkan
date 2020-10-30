import Head from 'next/head'
import Link from 'next/link'
export default function Layout({ children, username, login }) {
  return login ? (
    <div
      className="block text-center"
      style={{ height: '137px', boxShadow: '0 0 20px #8c8c8c' }}
    >
      <p
        className="block bg-grey-600"
        style={{
          fontFamily: 'Priyati',
          fontSize: '128px',
          transform: 'translate(0 , -10%)',
        }}
      >
        Ma-lork together!
      </p>
    </div>
  ) : (
    <div>
      <Head>
        <title>Malork</title>
      </Head>
      <div className="px-20  pt-12 pb-8">
        <div className="flex justify-end">
          <div className="inline-block">
            <Link href="/">
              <a
                className="mr-10"
                style={{ fontFamily: 'Quark-Bold', fontSize: '28px' }}
              >
                Homepage
              </a>
            </Link>
            <Link href="/about">
              <a
                className="mr-10"
                style={{ fontFamily: 'Quark-Bold', fontSize: '28px' }}
              >
                About Us
              </a>
            </Link>
          </div>
          {username ? (
            <>
              <Link href="/myposts">
                <a className="inline-block">
                  <div
                    className="-mt-2 rounded-lg bg-white text-xl relative"
                    style={{ height: '50px' }}
                  >
                    <div
                      className="text-white w-8 h-8 text-center absolute"
                      style={{
                        backgroundColor: '#AB3B61',
                        'border-radius': '50%',
                        top: '50%',
                        transform: 'translate(10px, -50%)',
                      }}
                    >
                      <p
                        className="text-2xl font-semibold"
                        style={{ 'line-height': '30px' }}
                      >
                        {username[0].toUpperCase()}
                      </p>
                    </div>
                    <p
                      className="pl-12 pr-2"
                      style={{
                        fontFamily: 'Quark-Bold',
                        fontSize: '18px',
                        transform: 'translate(0, 50%)',
                      }}
                    >
                      {username}
                    </p>
                  </div>
                </a>
              </Link>
            </>
          ) : (
            <Link href="/login">
              <a className="inline-block">
                <div
                  className="-mt-2 rounded-lg text-xl relative"
                  style={{ height: '50px', backgroundColor: '#AB3B61' }}
                >
                  <p
                    className="px-4 pt-1 text-white"
                    style={{ fontFamily: 'Mitr-Normal', fontSize: '28px' }}
                  >
                    Get Started
                  </p>
                </div>
              </a>
            </Link>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
