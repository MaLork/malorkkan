import Head from 'next/head'
import Link from 'next/link'
import Dropdown from './Dropdown.js'
export default function Layout({ children, username, login, admin }) {
  return (
    <div class="relative"style={{minHeight:"100vh"}}>
      {login ? (
        <div
          class="block text-center"
          style={{ height: '137px', 'box-shadow': '0 0 20px #8c8c8c' }}
        >
          <p
            class="block bg-grey-600"
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
          <div class="px-20  pt-12 pb-8">
            <div class="flex justify-end">
              <div class="inline-block">
                <Link href="/">
                  <a
                    class="mr-10"
                    style={{ fontFamily: 'Quark-Bold', fontSize: '28px' }}
                  >
                    Homepage
                  </a>
                </Link>
                <Link href="/about">
                  <a
                    class="mr-10"
                    style={{ fontFamily: 'Quark-Bold', fontSize: '28px' }}
                  >
                    About Us
                  </a>
                </Link>
              </div>
              {username ? (
                <div>
                  <div
                    class={'absolute -mt-2  text-xl relative '}
                    style={{ minWidth: 130, height: '50px' }}
                  >
                    <div
                      class="text-white w-8 h-8 text-center absolute"
                      style={{
                        backgroundColor: admin ? '#123D6A' : '#AB3B61',
                        'border-radius': '50%',
                        top: '50%',
                        transform: 'translate(10px, -50%)',
                      }}
                    >
                      {admin ? (
                        <img
                          src="../images/crown.svg"
                          style={{ width: 25, transform: 'translate(15%,15%)' }}
                        ></img>
                      ) : (
                        <p
                          class="text-2xl font-semibold"
                          style={{ 'line-height': '30px' }}
                        >
                          {username[0].toUpperCase()}
                        </p>
                      )}
                    </div>
                    <p
                      class="pl-12 pr-2 overflow-hidden"
                      style={{
                        color: admin ? '#FFFFFF' : '#000000',
                        fontFamily: 'Quark-Bold',
                        fontSize: '18px',
                        transform: 'translate(0, 50%)',
                      }}
                    >
                      {username}
                    </p>
                  </div>
                  <Dropdown username={username} admin={admin}></Dropdown>
                </div>
              ) : (
                <Link href="/login">
                  <a class="inline-block">
                    <div
                      class="-mt-2 rounded-lg text-xl relative"
                      style={{ height: '50px', backgroundColor: '#AB3B61' }}
                    >
                      <p
                        class="px-4 pt-1 text-white"
                        style={{ fontFamily: 'Mitr-Light', fontSize: '28px' }}
                      >
                        Get Started
                      </p>
                    </div>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
        {children}
      <div class="pb-20"></div>
      <div
        class="pr-20 absolute right-0 bottom-0"
        style={{
          height: '50px',
          width:"100vw",
          'padding-left': '7.125rem',
          backgroundColor: '#F2F2F2',
        }}
      >
        <div
          style={{
            fontFamily: 'Lato-Light',
            verticalAlign: 'baseline',
            transform: 'translate(0, 50%)',
          }}
        >
          <p class="inline mr-20">Content Policy</p>
          <p class="inline mr-20">About Us</p>
          <p class="inline">Help</p>
          <p class="float-right">Malork Inc © 2020. All rights reserved</p>
        </div>
      </div>
    </div>
  )
}
