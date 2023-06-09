import Head from "next/head";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router'
export default function ComingSoon () {
  const router = useRouter();
  const routeBack = (e) => {
    e.preventDefault();
    router.back();
  };
  const METATEDS_HOME = '/'
  {/*<Link href="/" passHref legacyBehavior>
    <ArrowBackIcon />
  </Link>*/}
  return (
    <>
      <Head>
        <title>🧸 Coming Sooon | MetaTeds</title>
      </Head>
      <div className="h-screen grid grid-cols-5 gap-10">
        <nav className="place-items-center col-start-1 col-span-1 top-0 pointer-event-none z-nav w-full">
          <div className="mt-4 w-full">
            <div className="flex fixed items-center cursor-pointer pointer-events-auto justify-between flex-row px-4">
              <div className="hover:bg-indigo-700 rounded-lg cursor-pointer">
                <a href="#" onClick={routeBack} className="">
                  <ArrowBackIcon />
                </a>
              </div>
              <div className="pl-4">
                <p>Back</p>
              </div>
            </div>
          </div>
        </nav>
        <div className="place-items-center my-auto col-start-2 col-span-3 text-center">
          <h1 className="text-lg sm:text-xl md:text-2xl">🚀 Coming soon</h1>
        </div>
        
      </div>
      
    </>
  );
}