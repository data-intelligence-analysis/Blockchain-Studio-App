import Head from "next/head";
import React, {useRef} from 'react'
import {useRouter} from 'next/router'
import MetaPixNavBar from "../../components/MetaPixNavBar";
import {server} from '../../config'
import { Circles } from "react-loader-spinner";
//import { MegaPhoneIcon } from "@heroicons/react/24/solid";
import {TwitterShareButton, TwitterIcon} from "react-share";
//import { CustomPlaceholder } from 'react-placeholder-image';
//import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
//import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function Community () {
  const router = useRouter();
  const routeBack = (e) => {
    e.preventDefault();
    router.back();
  };
  /*const OldAnnouncements = () => {
    return (
      <div className="flex items-center justify-between px-2 py-2 sm:py-3 sm:px-6 pointer-events-auto w-full mx-auto">
        <div className="flex flex-row justify-between items-center font-sans h-[50px] rounded-full bg-indigo-700 w-[60%] cursor-pointer max-w-xl min-w-fit">
          <p className="px-3 inline-block">📣</p>
          <div className="mr-2 sm:mr-4 py-3 px-2 sm:px-5 text-left">
            <p className="text-xs sm:text-base font-bold">Tune into the latest pixelate announcement news live on here</p>
          </div>
        </div>
      </div>
    )
  }*/
  const handleImg = (e) => {
    
    //get file upload
    const file = e.target.files[0]
    console.log(file);
    const reader = new FileReader();
    //this.setState({loading: true})
    
      
      reader.onload = (e) =>{
        
        //img tag
        const pixelatedImg = document.getElementById("pixelatedImg");
        //slider
        const pixelationElement = document.getElementById("pixelationRange");
        //const pixelationElement = document.querySelector(".pixel");
        const originalImg = pixelatedImg.cloneNode(true);
        //input tag
        //const fileInput = document.querySelector("#upload");
        //pixelatedImg.src = await fileToDataUri(file);
        // storing the original image
        //originalImg.src = await fileToDataUri(file);
        
        //return false;
        pixelatedImg.onload = () => {
          this.setState({loading: false})
          const canvas = document.createElement('canvas')
          var ctx = canvas.getContext("2d");
          ctx.drawImage(pixelatedImg, 0, 0);
          const MAX_WIDTH= 300;
          const MAX_HEIGHT=300;
          var width = pixelatedImg.width;
          var height = pixelatedImg.height;
          
          if (width > height){
            if (width > MAX_WIDTH){
              height *= MAX_WIDTH /width
              width = MAX_WIDTH;
            }
          }
          else{
            if (height > MAX_HEIGHT){
              width *= MAX_HEIGHT / height
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(pixelatedImg, 0, 0, width, height);
          const dataurl = canvas.toDataURL("image/png", "image/gif","image/jpg", "image/jpeg");
          this.setState({previewSrc: dataurl})
          
      
        }
        console.log(pixelationElement)
        /*fileInput.addEventListener("change", async (e) => {
          pixelatedImg.src = e.target.result;
          //storing the original image
          originalImg.src = e.target.result;
          pixelationElement.value = 0;
          return false
        })*/
        pixelatedImg.src = e.target.result;
        //storing the original image
        originalImg.src = e.target.result;
        pixelationElement.value = 0;
        
        pixelationElement.oninput = (e) => {
          const measurePromise = (fn) => {
            //let timeElapsed = true;
            let start = performance.now();
            let onPromiseDone = () => performance.now() - start;
            return fn().then(onPromiseDone);
          }
          /*const measure = (fn) => {
            let start = performance.now();
            fn();
            let end = performance.now()
            let duration = end-start
            if (end){
              return fn, console.log(`${duration} ms`)
            }else{
              return this.setState({loading: true})
            }
            return performance.now() - start;
          }*/
          /*
            measure (pixelating)
          
          const pixelating = () =>{
            this.setState({loading:false})
            pixelateImg(originalImg, parseInt(e.target.value))
          }*/
          
          const initialPromise = () =>{
            return new Promise((resolve) => {
              resolve(
                pixelateImg(originalImg, parseInt(e.target.value))
              )
              
            })
          }
          measurePromise(initialPromise).then((duration)=>{
            console.log(`function took ${duration} ms`);
          }).catch(`Error`)
          /*var promise = new Promise((resolve) =>{
            let start = performance.now();
            
            resolve(
              pixelateImg(originalImg, parseInt(e.target.value))
            )
            let onPromiseDone = () => performance.now() - start;
            console.log(`${onPromiseDone} ms`)
          })*/
          
          
          /*try{
            //let loadingState = this.setState({loading: true})
            let start = performance.now()
            pixelateImg(originalImg, parseInt(e.target.value))
            let end = performance.now()
            console.log(`Execution time: ${end - start} ms`);
            //let pixelTimeout = setTimeout(pixelateImg, 2000, originalImg, parseInt(e.target.value))
            //clearTimeout(pixelTimeout)
          }catch(e){
            console.log(e)
          }*/
          
          
          
        }
        
        
        const pixelateImg = (ogImg, pixelationFactor) => {
          //let timeout = 1000;
          //const baseThis = this;
          
        const canvas = document.createElement("canvas");
        const context = canvas.getContext('2d');
        var originalWidth = ogImg.width;
        var originalHeight = ogImg.height;
        const canvasWidth = originalWidth;
        const canvasHeight = originalHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        
        context.drawImage(ogImg, 0, 0, originalWidth, originalHeight);
        const originalImageData = context.getImageData(
          0,
          0,
          originalWidth,
          originalHeight
        ).data;
        if (pixelationFactor !== 0){
          for (let y=0; y < originalHeight; y += pixelationFactor ){
            for (let x=0; x < originalWidth; x += pixelationFactor){
              // extracting the position of the sample pixel
              const pixelIndexPosition = (x + y * originalWidth)*4;
  
              // drawing a square replacing the current pixels
              context.fillStyle = `rgba(
                ${originalImageData[pixelIndexPosition]},
                ${originalImageData[pixelIndexPosition + 1]},
                ${originalImageData[pixelIndexPosition + 2]},
                ${originalImageData[pixelIndexPosition + 3]}
              )`;
              context.fillRect( x,y, pixelationFactor,pixelationFactor);
  
            }
          }
        }
        pixelatedImg.src = canvas.toDataURL();
          
        }
      }
      reader.readAsDataURL(file)
      return false
    
  };
  //replacement for react lib
  const MegaPhoneIcon = () =>{
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M16.881 4.346A23.112 23.112 0 018.25 6H7.5a5.25 5.25 0 00-.88 10.427 21.593 21.593 0 001.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.592.772-2.468a17.116 17.116 0 01-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0018 11.25c0-2.413-.393-4.735-1.119-6.904zM18.26 3.74a23.22 23.22 0 011.24 7.51 23.22 23.22 0 01-1.24 7.51c-.055.161-.111.322-.17.482a.75.75 0 101.409.516 24.555 24.555 0 001.415-6.43 2.992 2.992 0 00.836-2.078c0-.806-.319-1.54-.836-2.078a24.65 24.65 0 00-1.415-6.43.75.75 0 10-1.409.516c.059.16.116.321.17.483z" />
      </svg>
    )
  }
  const Announcements = () => {
    return (
      <div className="p-6 lg:p-8 items-center">
        <div className="block rounded-full mx-auto pointer-events-auto bg-indigo-700 w-full text-white">
          <div className="flex flex-row h-full my-auto font-hand align-middle items-center font-bold">
            <div className="w-[65vw] sm:w-[65vw] lg:w-[70vw] py-2 max-w-screen-sm flex inline-flex items-center">
              <div className="px-2">
                <MegaPhoneIcon />
              </div>
              <div className="relative h-full overflow-hidden flex flex-wrap flex-row inline-flex justify-center webkit-util-center ">
                <div direction="rtl" 
                      className="s45ws6s6s animate-studio"
                      >
                  <div className="inline-block relative" style={{top: '0px', left: '0px'}}>
                    <div className="flex h-7 px-4 lg:px-6 overflow-hidden text-xs sm:text-sm lg:text-base items-center">
                      <h1 className="font-pixel text-xs text-center text-slate-200">Tune into the latest announcements here !</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const METATEDS_HOME = '/'
  {/*<Link href="/" passHref legacyBehavior>
    <ArrowBackIcon />
  </Link>*/}
  const myRef = useRef()
  return (
    <>
      <Head>
        <title>🧸 Service | MetaTeds</title>
      </Head>
      <div className="bg-slate-900 min-h-screen">
        <MetaPixNavBar bgFormat={"bg-[#320D12]"} opacity={"opacity-100"}/>
        <div className="min-h-full w-screen overflow-y-auto items-center m-3 lg:m-4 max-w-screen-2xl border-shadow mx-auto">
          <nav className="mt-20 lg:mt-10 lg:pt-3 w-full z-30 flex justify-between items-center">
            <Announcements />
          </nav>
          <div className="grid place-items-center text-center mb-4 mt-8 w-full px-4 lg:px-8">
            <div className="flex-col my-4 px-2 mx-auto text-center">
              <div className="w-[300px] border h-[300px] my-2 w-full border-slate-100 rounded-md">

              </div>
              <span className="px-2 flex items-center justify-center">
                <p className="inline-block font-pixel text-xs">Pixelation:</p>
                <input
                  onInput=""
                  type="range"
                  min="0"
                  max="15"
                  defaultValue="0"
                  step="1"
                  className="inline-block"
                  id="pixelationRange"
                  ref={myRef}
                />
              </span>
            </div>
            <div className="mt-3 px-1 lg:px-2 mb-3 py-1 lg:py-2 font-sans items-center">
              <input className="text-center" onChange="" ref={myRef} id="upload" type="file" accept="image/*" />
            </div>
            <div className="mt-3 p-2 lg:p-4 flex items-center text-center justify-center gap-x-4 w-full">
              <button onClick={() => alert('download feature coming soon')} className="px-2 lg:px-4 py-2 lg:py-3 bg-indigo-700 rounded-md hover:bg-slate-900 hover:ring-indigo-700 hover:ring-4">
                <p className="sm:text-base text-xs font-pixel">Download</p>
              </button>
              <TwitterShareButton
                url={`${server}/metapix/community`}
                title={"Pixelate your digital image assets with MetaTeds free tool"}
                hashtag="#metateds #Solana #WAGMI"
              >
                <button className="px-2 lg:px-4 py-2 lg:py-3 bg-indigo-700 rounded-md hover:bg-slate-900 hover:ring-indigo-700 hover:ring-4">
                  <p className="sm:text-base text-xs font-pixel">Tweet</p>
                </button>
              </TwitterShareButton>
             
            </div>
          </div>
          
        </div>
      </div>
      
    </>
  );
}