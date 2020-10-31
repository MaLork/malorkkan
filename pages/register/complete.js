import Layout from '../../components/Layout.js'
import Link from 'next/link'
export default function registerComplete(){
    return(
        <Layout>
            <div class="flex text-center items-center justify-center" style={{"height":"100%","minHeight": "71.7vh"}}>
                <div class="-mt-24">
                    <p style={{"fontFamily":"Lato-Bold","fontSize":"48px","color":"#AB3B61"}}>Thank you for joining us!</p>
                    <p class="mb-6 mt-2"style={{"fontFamily":"Mitr-Light","fontSize":"32px"}}>Now you can post and comment and sharing your idea to our community.</p>
                    <button class="focus:outline-none rounded-2xl" style={{"width":"auto","backgroundColor":"#52C587"}}>
                        <Link href="/login">
                            <p class="px-12 pb-1 pt-2"style={{"fontFamily":"Quark-Bold","fontSize":"28px","color":"#FFFFFF"}}>Let’s explore our community NOW!!!</p>
                        </Link>
                    </button>
                </div>
            </div>
        </Layout>
    )
}