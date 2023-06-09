import Head from "next/head";
import Link from 'next/link';
import Image from 'next/image';
import React, {useState, useRef, useEffect} from 'react';
import {useRouter} from 'next/router';
import metapix_logo from '../../assets/metapix_banner.png'
import head_pixel from '../../assets/metapix_head_pixel.png'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import aws from '../api/connectAWS'
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Circles } from "react-loader-spinner";
import { buildUrl } from 'cloudinary-build-url';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const HomeURL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : process.env.BASE_URL;


/*const customLoader = ({src, width, quality}) => {
  return process.env.NODE_ENV === "production" ?
  `${process.env.BASE_URL}/${src}?${width}&q=${quality || 75}`:
`http://localhost:3000/${src}?${width}&q=${quality || 75}`;
}*/


export default function Home () {
  //cloudinary build url
  const url = buildUrl('metapix_media/workstation_ifhbpq', {
    cloud:{
      cloudName: 'dg7z2hep5',
      resourceType: 'image',
      storageType:'upload'
    },
  })
  const urlBlurred = buildUrl('metapix_media/workstation_ifhbpq', {
    cloud:{
      cloudName: 'dg7z2hep5',
      resourceType: 'image',
      storageType:'upload'
    },
    transformations:{
      effect:{
        name: 'blur:1000',
        quality: 1
      }
    }
  })
  
  const router = useRouter();
  const ref = useRef(null);
  //react hooks
  const [message, setMessage] = useState({
    open: false,
    msg: "",
    severity:undefined,
    hideDuration:undefined
  });
  //const [image, setImage] = useState()
  const [file, setFile] =useState();
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false);

  const {pathname} = useRouter();
  const downloadFile = async() => {
    
    setLoading(true)
    try{
      setMessage({
        open:true,
        msg:"Download started....",
        severity:"info",
        hideDuration: 6000
      })
      
      var state = await aws()
      /*var state = fetch('../api/connectAWS',{
        method: 'GET',
        headers: {
          "Content-Type": "application/zip",
          ...corsHeaders
        }
      })*/
      if (state.success) {
        setMessage({
          open:true,
          msg:String(state.success),
          severity:"success",
          hideDuration: 8000
        })
      }
      setMessage({
        open:true,
        msg:String(state.error),
        severity:"error",
        hideDuration: 8000
      })
      
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
    
  }
  {/*if (loading){
    return (
      <Circles 
        width='30' 
        height='30' 
        color="purple"
        ariaLabel = "circles-loading"
        wrapperClass="items-center justify-center"
        />
    )
    */}
  const FileDownload = () =>{
    return (
      <div ref={ref}>
        {loading ? <Circles 
              width='30' 
              height='30' 
              color="green"
              ariaLabel = "circles-loading"
              wrapperClass="items-center justify-center"
              />:
        <button className="flex text-base sm:text-lgpt-4 bg-indigo-700 hover:bg-violet-600 hover:ring-indigo-700 hover:ring-2 w-full px-2 py-2 rounded-lg" onClick={downloadFile}> {/*()=>alert('Python script - pixelate avatars, nfts and much more (Coming Soon...)')*/}
            <FileDownloadIcon/>{" "}<p className="inline-block pl-1 font-sans">Download [Mac]</p>
        </button>}
      </div>
      
    )
  }
  useEffect(() => {
    const HandleClicks = (e) => {
      // check if element that was clicked is inside of ref'd component
      // if so no action is required from this event listener so exit
      if (ref.current && ref.current.contains(e.target)){
        return;
      }
      //console.log("outside the ref")
    }
    document.body.addEventListener("click", HandleClicks)
    // CLEANUP
    // remove event listener
    return () => {
      document.body.removeEventListener("click", HandleClicks)
    }
  },[]);

  useEffect(()=> setMounted(true), [])
  if(!mounted) return null

  /*Testing image loading*/
  /*useEffect(()=>{
    setTimeout(()=> {
      setImage(url);
    }, 2000)
  }, [])*/
  //https://res.cloudinary.com/dg7z2hep5/image/upload/v1674425639/metapix_media/workstation_ifhbpq.png
  /*backgroundAttachment: 'fixed',*/
  const artShowApp = {
    backgroundImage: `url(${url})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    backgroundPosition: 'center center',
    position: 'absolute',
    top: 0,
    left: 0,
  }

  const artShowAppBlurred = {
    height: '100vh',
    position: 'relative',
    paddingTop: `${(1080/1920)*100}%`,
    backgroundPosition: 'center center',
    backgroundImage: `url(${urlBlurred})`,
    backgroundSize: `cover`,
    objectFit: 'contain'
  }
  const Back = (event) => {
    event.preventDefault();
    router.back();
  };
  return (
    <>
      <Head>
        <title>✨ Metapix | MetaTeds</title>
      </Head>
      <div ref={ref}>
        {" "}
        <div
          style={artShowAppBlurred}>
          <section className="min-h-full min-h-screen w-full relative" style={artShowApp}>
            <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
              <nav className="fixed top-0 left-0 w-full z-20 bg-[#320D06]">
                <div className="mx-auto px-2 py-2 flex text-center items-center gap-x-1 sm:gap-x-2 justify-between pointer-events-auto flex-row">
                  <a href="#" onClick={Back} className="rounded-lg hover:bg-slate-900 rounded-lg cursor-pointer px-2 py-2">
                    <span><ArrowBackIcon /></span>
                    <span className="ml-2 inline-block text-base leading-7">Back</span>
                  </a>
                  <p className="inline-box font-sans text-center text-xs sm:text-sm md:text-base">MetaPix is a creation studio platform offering a plethora of free and paid tools</p>
                  <a href={HomeURL} className="rounded-lg hover:bg-slate-900 rounded-lg cursor-pointer px-1 py-1 sm:px-2 sm:py-2">
                    <span className="mr-2 inline-block text-base leading-6">Home</span>
                    <ArrowForwardIcon />
                  </a>
                </div>
              </nav>
              <div className="sm:h-screen text-align items-center justify-center flex flex-col m-4 p-5 sm:p-8 md:p-10 sm:grid sm:place-items-center sm:grid-cols-10">
                <div className="mt-20 mb-5 sm:mb-10 col-span-5 col-start-1 mx-auto">
                  <span className="box-border block overflow-hidden bg-none opacity-100 border-0 m-0 p-0 relative">
                    <Image
                      src={metapix_logo}
                      alt="metapix"
                      height="auto"
                      width= "500"
                      placeholder='shimmer'
                      style = {{objectFit: 'contain', objectPosition: 'center', borderRadius: '15px'}}
                    />
                  </span>
                </div>
                <div className="mt-5 sm:mb-10 col-span-6 col-start-6">
                  <div className="px-4 py-2 sm:py-4 sm:px-8 mx-auto flex rounded-md h-full sm:h-full w-full drop-shadow-xl border-indigo-700 bg-[#5C5C5C]">
                    <div className="flex flex-col px-2 py-4 items-center justify-center cursor-pointer">
                      <span className="box-border block overflow-hidden bg-none opacity-100 border-0 m-0 p-0 relative">
                        <Image
                          src={head_pixel}
                          alt="head_banner"
                          height="auto"
                          width= "160"
                          placeholder='shimmer'
                          style = {{objectFit: 'contain', objectPosition: 'center', borderRadius: '18px'}}
                        />
                      </span>
                      <div className="mt-4">
                        {pathname === "/metapix" && (
                          <Link href='/metapix/dao' legacyBehavior>
                            <a className="cursor-pointer">
                              <button type="button" className="flex text-xs font-pixel tracking-tighter sm:text-sm bg-indigo-700 hover:bg-violet-600 hover:ring-indigo-700 hover:ring-2 w-full px-2 py-2 rounded-lg">
                                  App
                              </button>
                            </a>
                          </Link>)}
                      </div>
                      <div className="mt-4">
                        {pathname === "/metapix" && (
                          <Link href='/metapix/community' legacyBehavior>
                            <a className="cursor-pointer">
                              <button type="button" className="flex text-xs font-pixel tracking-tighter sm:text-sm bg-indigo-700 hover:bg-violet-600 hover:ring-indigo-700 hover:ring-2 w-full px-2 py-2 rounded-lg">
                                  Pixelate
                              </button>
                            </a>
                          </Link>)}
                      </div>
                      {/*<div className="mt-4 cursor-pointer flex items-center justify-center">
                          <FileDownload />
                        
                        </div>*/}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Snackbar
                  open={message.open}
                  autoHideDuration={
                    message.hideDuration === undefined ? 6000 : message.hideDuration
                  }
                  onClose={() => setMessage({ ...message, open: false })}
                >
                  <Alert
                    onClose={() => setMessage({ ...message, open: false })}
                    severity={message.severity}
                  >
                    {message.msg}
                  </Alert>
                </Snackbar>
              </div>
            </div>
            
          </section>
        </div>
      </div>
    </>

  )
  
}