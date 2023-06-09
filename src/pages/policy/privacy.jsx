import Head from "next/head";
import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { IconContext } from "react-icons";
import PrivacyPolicy from "../../components/Layouts/PrivacyPolicy";
import NavBar from '../../components/NavBar'
//import { FcComboChart, FcDocument } from "react-icons/fc";
//import { GrDocumentVerified, GrDocumentConfig, GrDocumentText } from "react-icons/gr";
import { HiClipboardDocumentList, HiDocumentCheck, HiDocument, HiDocumentText} from "react-icons/hi";
export default function Privacy() {
  const router = useRouter();
  const routeBack = (e) => {
    e.preventDefault();
    router.back();
  };
  const METATEDS_HOME = '/'
  return (
    <>
      <Head>
        <title>Privacy | MetaTeds</title>
      </Head>
      <div className="bg-slate-900 h-screen">
        <div className="mx-auto min-h-full overflow-y-auto p-4 px-8 items-center lg:max-w-screen-xl">
          <NavBar bgFormat={"bg-slate-900/80"}/>
          <nav className="mt-20 flex items-center justify-between top-0 pointer-event-auto z-nav w-full">
            <div className="mt-4 w-full">
              <div className="flex items-center cursor-pointer pointer-events-auto inline-flex flex-row px-4">
                <div className="p-2 hover:bg-indigo-700 rounded-lg cursor-pointer">
                  <a href="#" onClick={routeBack} className="inline-flex items-center gap-x-2 flex">
                    <ArrowSmallLeftIcon className="text-white h-5 w-5 items-center" />
                    <p className="inline-block items-center">Back</p>
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <div className="p-4 mx-auto overflow-hidden items-center text-center text-slate-50 transform transition-all my-4 sm:my-8 sm:p-5 opacity-100 translate-y-0 sm:scale-100">
            <div className="mb-8 items-center flex justify-center">
              <IconContext.Provider value={{ size: "4em", color:"white", className: "global-class-name" }} >
                <div>
                  <HiDocumentText />
                </div>
              </IconContext.Provider>
            </div>
            <PrivacyPolicy />
          </div>
        </div>
        
        
      </div>
      
    </>
  );
}