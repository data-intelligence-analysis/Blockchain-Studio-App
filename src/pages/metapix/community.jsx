import Head from "next/head";
import React, { useState, useEffect, useRef } from 'react'
import {useRouter} from 'next/router'
import MetaPixNavBar from "../../components/MetaPixNavBar";
import {server} from '../../config'
import { Circles } from "react-loader-spinner";
import {FaUpload} from "react-icons/fa"
import { IconContext } from "react-icons";
import {TwitterShareButton} from "react-share";
//import Image from 'next/image'
//import { CustomPlaceholder } from 'react-placeholder-image';
//import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
//import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import { MegaPhoneIcon } from "@heroicons/react/24/solid";

export default function Community () {
  //states
  const containerRef = useRef(null);
  const canvasRef = useRef(null)
  const [src, setSrc] = useState(null);
  const [pixelSize, setPixelSize] = useState(0);
  const [pixelState, setPixelState] = useState(null);
  const [imgFile, setImgFile] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [fileName, setFileName] = useState("No image selected");

  const router = useRouter();
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
  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader();
    if (file) {
      setImgFile(file)
      setInputValue('')
    } else {
      setInputValue(null)
    }
    reader.onload = (event) => {
      //setSrc(event.target.result);
      setSrc(event.target.result);
      
    };
    reader.readAsDataURL(file);
    
  };

    const handleButtonClick = () => {
      document.getElementById("fileInput").click();
    };


  /*const pixelateBtn = () => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const ratio = Math.min(width / img.width, height / img.height);
      canvasRef.current.width = img.width * ratio;
      canvasRef.current.height = img.height * ratio;
      
      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
      const pixels = imageData.data;

      const pixelate = (pixels, width, pixelWidth) => {
        const numPixels = pixelWidth * pixelWidth;
        for (let i = 0; i < pixels.length; i += 4) {
          const pixelStartIndex = i - ((i / 4) % width) * 4 - ((i / 4) / width) * width * 4;
          let r = 0;
          let g = 0;
          let b = 0;
          for (let j = 0; j < numPixels; j++) {
            const pixelIndex = pixelStartIndex + ((j % pixelWidth) * 4) + (Math.floor(j / pixelWidth) * width * 4);
            r += pixels[pixelIndex];
            g += pixels[pixelIndex + 1];
            b += pixels[pixelIndex + 2];
          }
          r /= numPixels;
          g /= numPixels;
          b /= numPixels;
          for (let j = 0; j < numPixels; j++) {
            const pixelIndex = pixelStartIndex + ((j % pixelWidth) * 4) + (Math.floor(j / pixelWidth) * width * 4);
            pixels[pixelIndex] = r;
            pixels[pixelIndex + 1] = g;
            pixels[pixelIndex + 2] = b;
          }
        }
      }

      pixelate(pixels, canvasRef.current.width, pixelSize);
      ctx.putImageData(imageData, 0, 0);
    };
  }*/
  /*function pixelate_new (pixels, canvas_width, pixelSize ) {
    // Pixelate the image
    const pixelWidth = Math.floor(pixelSize);
    const numPixels = pixelWidth * pixelWidth;
    for (let i = 0; i < pixels.length; i += 4) {
      const pixelStartIndex = i - ((i / 4) % canvas_width) * 4 - ((i / 4) / canvas_width) * canvas_width * 4;
      let r = 0;
      let g = 0;
      let b = 0;
      for (let j = 0; j < numPixels; j++) {
        const pixelIndex = pixelStartIndex + ((j % pixelWidth) * 4) + (Math.floor(j / pixelWidth) * canvas_width * 4);
        r += pixels[pixelIndex];
        g += pixels[pixelIndex + 1];
        b += pixels[pixelIndex + 2];
      }
      r /= numPixels;
      g /= numPixels;
      b /= numPixels;
      for (let j = 0; j < numPixels; j++) {
        const pixelIndex = pixelStartIndex + ((j % pixelWidth) * 4) + (Math.floor(j / pixelWidth) * canvas_width * 4);
        pixels[pixelIndex] = r;
        pixels[pixelIndex + 1] = g;
        pixels[pixelIndex + 2] = b;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    
  }*/
  
  
  const pixelate = (originalImg, img) => {
    //const img = document.getElementById("pixelatedImg")
    //const originalImg = img.cloneNode(true);
    const pixelatedCanvas = document.createElement("canvas");
    const ctx = pixelatedCanvas.getContext('2d');
    originalImg.src = src;
    ctx.drawImage(originalImg, 0, 0)
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const ratio = Math.min(width / originalImg.width, height / originalImg.height);
    pixelatedCanvas.width = originalImg.width * ratio;
    pixelatedCanvas.height = originalImg.height * ratio;
    ctx.imageSmoothEnabled = false;
    ctx.drawImage(originalImg, 0, 0, pixelatedCanvas.width, pixelatedCanvas.height);
    const pixelWidth = pixelSize;
    //ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, pixelWidth, pixelWidth);
    const imageData = ctx.getImageData(0, 0, pixelatedCanvas.width, pixelatedCanvas.height);
    const pixels = imageData.data;
    /*const numPixels = pixelWidth * pixelWidth;
    for (let i = 0; i < pixels.length; i += 4) {
      const pixelStartIndex = i - ((i / 4) % canvas.width) * 4 - ((i / 4) / canvas.width) * canvas.width * 4;
      let r = 0;
      let g = 0;
      let b = 0;
      for (let j = 0; j < numPixels; j++) {
        const pixelIndex = pixelStartIndex + ((j % pixelWidth) * 4) + (Math.floor(j / pixelWidth) * canvas.width * 4);
        r += pixels[pixelIndex];
        g += pixels[pixelIndex + 1];
        b += pixels[pixelIndex + 2];
      }
      r /= numPixels;
      g /= numPixels;
      b /= numPixels;
      for (let j = 0; j < numPixels; j++) {
        const pixelIndex = pixelStartIndex + ((j % pixelWidth) * 4) + (Math.floor(j / pixelWidth) * canvas.width * 4);
        pixels[pixelIndex] = r;
        pixels[pixelIndex + 1] = g;
        pixels[pixelIndex + 2] = b;
      }
    }
    ctx.putImageData(imageData, 0, 0);*/
    if (pixelWidth != 0) {
      for (let y=0;  y < pixelatedCanvas.height; y+=pixelWidth ) {
        for ( let x=0; x < pixelatedCanvas.width; x+=pixelWidth) {
          // extracting the position of the sample pixel
          const pixelIndex = (x + y * pixelatedCanvas.width)*4;
          // drawing a square replacing the current pixels
          ctx.fillStyle = `rgba(
            ${pixels[pixelIndex]},
            ${pixels[pixelIndex + 1]},
            ${pixels[pixelIndex + 3]}
            ${pixels[pixelIndex + 2]},
          )`;
          ctx.fillRect( x,y, pixelWidth, pixelWidth);
        }
      }
    }
    //ctx.putImageData(imageData, 0, 0)
    img.src = pixelatedCanvas.toDataURL();
    //return canvas.toDataURL();
  }
  
  const handlePixelSizeChange = (event) => {
    setPixelSize(event.target.value)
    var input = document.getElementById('pixelationRange')
    if (parseInt(input.value) === parseInt(input.min)){
      setPixelState(false)
    } else {
      setPixelState(true);
    }
    
    /*if (src) {
      //useRef - to get elements of the canvas
      //const canvas = canvasRef.current;
      //const canvas = document.createElement("canvas");
      //const ctx = canvas.getContext('2d');
      //const pixelationElement = document.getElementById("pixelationRange");
      //const img = new Image();
      //const pixelatedImg = document.getElementById("pixelatedImg");
      //const img = document.createElement('img');
      //img.setAttribute("id", "pixelatedImg");
      //const pixelatedImage = document.getElementById("pixelatedImg")
      //const originalImg = pixelatedImage.cloneNode(true);
      // showing the uploaded image
      //pixelatedImg.src = src;
      //storing the original image
      
      //pixelatedImage.src = src;
      //originalImg.src = src;
      //img.src = src;
      //img.onload = () => {
      //};
      pixelatedImage.onload = () =>{
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const ratio = Math.min(width / originalImg.width, height / originalImg.height);
        canvas.width = originalImg.width * ratio;
        canvas.height = originalImg.height * ratio;
        ctx.drawImage(originalImg, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        const pixelWidth = Math.floor(pixelSize);
        canvas.width = originalImg.width
        canvas.height = originalImg.height
        ctx.drawImage(originalImg, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data
        const pixelWidth = Math.floor(pixelSize);
        
        //pixelate(pixels, ctx, canvas, canvas.width, canvas.height, pixelWidth, pixelatedImage);
        //pixelate_new(pixels, canvas.width, pixelSize)
      }
      
    }*/
    
  }
  
  const handleDownload = () => {
    if (imgFile) {
      const url = window.URL.createObjectURL(imgFile);
      const link = document.createElement("a");
      link.download = imgFile.name;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  const removeImage = () => {
    setImgFile(null);
    setFileName("Image removed!");
  }
  useEffect(() => {
    if (src && imgFile) {
      const pixelationElement = document.getElementById('pixelationRange')
      if (parseInt(pixelationElement.value) === parseInt(pixelationElement.min)){
        setPixelState(false);
      } else {
        setPixelState(true);
      }
      //creating canvas
      //construct new image class
      //const img = new Image();
      const img = document.getElementById("pixelatedImg")
      const originalImg = img.cloneNode(true);
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d');
      //const img = document.createElement('img');
      //img.setAttribute("id", "pixelatedImg");
      //uploaded image by id
      //const pixelatedImg = document.getElementById("pixel_canvas");
      //const originalImg = pixelatedImg.cloneNode(true);
      // showing the uploaded image
      // pixelatedImg.src = src;
      // storing the original image
      //originalImg.src = src;
      // updating the image src
      img.src = src;
      originalImg.src = src;
      img.onload = (event) => {
        ctx.drawImage(img, 0, 0)
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const ratio = Math.min(width / img.width, height / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        //img.src = '';
        //const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        //const pixels = imageData.data;
        
        pixelate(originalImg, img)
        //canvasRef.current.width = img.width * ratio;
        //canvasRef.current.height = img.height * ratio;
        //const ctx = canvasRef.current.getContext('2d');
        //ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        /*const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        const pixels = imageData.data;

        const pixelate = (pixels, width, height, pixelWidth) => {
          if (pixelWidth != 0) {
            for (let y=0;  y < height; y+=pixelWidth ) {
              for ( let x=0; x < width; x+=pixelWidth) {
                // extracting the position of the sample pixel
                const pixelIndex = (x + y * width)*4;
                // drawing a square replacing the current pixels
                ctx.fillStyle = `rgba(
                  ${pixels[pixelIndex]},
                  ${pixels[pixelIndex + 1]},
                  ${pixels[pixelIndex + 3]}
                  ${pixels[pixelIndex + 2]},
                )`;
                ctx.fillRect( x,y, pixelWidth, pixelWidth);
              }
            }
          }
          img.src = canvasRef.current.toDataURL();
        }

        pixelate(pixels, canvasRef.current.width, canvasRef.current.height, pixelSize);
        //ctx.putImageData(imageData, 0, 0);*/
      };
      
      //pixelate(pixels, ctx, canvas, canvas.width, canvas.height, pixelWidth, img);
      if (imgFile){
        //console.log("Successfully uploaded picture!")
        setFileName(imgFile.name);
      }
      
    }
    
    
  }, [imgFile, src, pixelSize])

  
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
  return (
    <>
      <Head>
        <title>🧸 Service | MetaTeds</title>
      </Head>
      <div className="bg-slate-900 min-h-full">
        <MetaPixNavBar bgFormat={"bg-[#320D12]"} opacity={"opacity-100"}/>
        <div className="min-h-screen max-w-full mx-auto overflow-y-auto items-center m-3 lg:m-4 border-shadow">
          <nav className="mt-20 lg:mt-10 lg:pt-3 w-full z-30 flex justify-between items-center">
            <Announcements />
          </nav>
          <div className="w-full grid place-items-center text-center mb-4 mt-8 w-full px-4 lg:px-8">
            <div className="pointer-cursor-auto flex-col my-4 px-2 mx-auto text-center">
              <div ref={containerRef} className={`w-[300px] h-[300px] sm:w-[500px] border sm:h-[450px] flex items-center justify-center mx-auto my-2 ${imgFile ? ('border-none'):('border-slate-100')} rounded-md`}>
                 
                  <div className="grid place-items-center">
                    {src ? (
                      <div>
                        {imgFile && <img
                          className="flex justify-center items-center" 
                          id="pixelatedImg"
                          //crossorigin="anonymous"
                    />}
                        {/*<canvas id="pixel_canvas" ref={canvasRef} />*/}
                      </div>): 
                      (
                        <IconContext.Provider value={{ size: "3em", className: "global-class-name" }}>
                          <div>
                            <FaUpload />
                          </div>
                        </IconContext.Provider>
                      )
                    }
                  </div>
                
                {/*src && 
                <img 
                  src={src} 
                  ref={canvasRef}
                  alt="uploaded"
                  style={{ ...pixelatedStyle, position: 'absolute' }}
                />*/}
              </div>
              <div className="flex items-center justify-center">
                {src && <span className="mt-3 mb-4 px-2 flex items-center justify-center text-xs font-pixel">
                  <p className="inline-block font-pixel text-xs">Pixelation:</p>
                  <input
                    onChange={handlePixelSizeChange}
                    type="range"
                    min="0"
                    max="20"
                    value= {pixelSize}
                    step="1"
                    className="inline-block"
                    id="pixelationRange"
                  />
                  <label htmlFor="pixel-range" className="ml-2 text-xs">{pixelSize}px</label>
                </span> }
              </div>
              {src && <div className="font-sans flex justify-center items-center px-2 align-middle text-center">
                <div className="p-2 lg:p-3">
                  {/*<button type="button" disabled className={`p-1 px-2 sm:p-2 ${pixelSize === 0 ? 'text-slate-300 cursor-not-allowed bg-indigo-700/60':'bg-indigo-700 hover:bg-slate-900 hover:ring-indigo-700 hover:ring-4'} rounded-md`}>
                      <p className="text-sm">Pixelate</p>
              </button>*/}
                  {pixelState ? (<button id="active" className="p-1 px-2 sm:p-2 bg-indigo-700 rounded-md hover:bg-slate-900 hover:ring-indigo-700 hover:ring-4">
                    <p className="text-sm">Pixelate</p>
                  </button>): 
                  (<button type="button" id="disabled" disabled className="p-1 px-2 sm:p-2 text-slate-300 cursor-not-allowed bg-indigo-700/60 rounded-md">
                    <p className="text-sm">Pixelate</p>
                  </button>)}
                </div>
                <div className="p-2 lg:p-3">
                  <button onClick={removeImage} className="p-1 px-2 sm:p-2 bg-indigo-700 rounded-md hover:bg-slate-900 hover:ring-indigo-700 hover:ring-4">
                    <p className="text-sm">Remove</p>
                  </button>
                </div>
              </div>}
              
              <div className="font-pixel text-center items-center my-4">
                <p className="text-xs">{fileName}</p>
              </div>
              <div className="flex justify-center items-center cursor-pointer font-sans mx-auto max-w-xs sm:max-w-sm min-w-full bg-indigo-700 hover:border-indigo-300 hover:border-4 h-full mt-4 px-1 lg:px-2 mb-3 py-1 lg:py-2">
                {/*<label htmlFor="fileInput">{inputValue}</label>*/}
                {/*<button className="" onClick={handleButtonClick}>{inputValue}</button>*/}
               
                <input className="w-full" id="upload" type="file" onChange={handleImageUpload} value={inputValue} accept="image/*"/>
              </div>
            </div>
            
            <div className="mt-3 p-2 lg:p-4 flex items-center text-center justify-center gap-x-4 w-full">
              {imgFile ? (<button onClick={handleDownload} className="px-2 lg:px-4 py-2 lg:py-3 bg-indigo-700 rounded-md hover:bg-slate-900 hover:ring-indigo-700 hover:ring-4">
                <p className="sm:text-base text-xs font-pixel">Download</p>
              </button>) : (<button onClick={handleDownload} disabled className="px-2 lg:px-4 py-2 lg:py-3 text-slate-300 bg-indigo-700/60 cursor-not-allowed rounded-md">
                <p className="sm:text-base text-xs font-pixel">Download</p>
              </button>)
              }
              <TwitterShareButton
                url={`${server}/metapix/community`}
                title={"Pixelate your digital image assets with MetaTeds free tool"}
                hashtag="#metateds #Solana #WAGMI"
              >
                <div className="px-2 lg:px-4 py-2 lg:py-3 bg-indigo-700 rounded-md hover:bg-slate-900 hover:ring-indigo-700 hover:ring-4">
                  <p className="sm:text-base text-xs font-pixel">Tweet</p>
                </div>
              </TwitterShareButton>
             
            </div>
          </div>
          
        </div>
      </div>
      
    </>
  );
}