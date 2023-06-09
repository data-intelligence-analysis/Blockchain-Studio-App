//import S3 from "aws-sdk/clients/s3";
import { S3Client, AbortMultipartUploadCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import axios from 'axios';
import fileDownload from 'js-file-download';
//const path = require("path")
//const fs = require("fs")
//aws-sdk v2
/*const s3 = new S3({
  region: "us-east-2", //Ohio
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  signatureVersion: 'v4'
})*/
const s3 = new S3Client({
  region: "us-east-2", //Ohio
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  }
})
const expireTime = 60
export default async function aws(){
  const file = 'pixelart-generator.zip'
  //const params
  const constantParams = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
  }
  const handleErrors = (e) => {
    throw new Error (e)
  }
  try{
    //const objectUrl = s3.getObject(fileParams).createReadStream();
    //let res = await axios.get(objectUrl)
    //let responseData = res.data
    //console.log(responseData)
    //retrieve and download file from s3 bucket to local disk
    //resp.status(StatusCodes.ACCEPTED).json(respond)
    //console.log(resp.data)
    //resp.data.pipe(fs.createWriteStream('./pixelart-generator'))
    //const unzip = zlib.createGunzip(); 
    /*resp.data.pipe(unzip).pipe(fileWriteStream).on('finish', () =>{
      console.log("Donwload Completed")
    }).on('error', (err)=>{
        console.log(err)
    })*/
    /*const params = {
      ...constParams,
      Prefix: `pixelate/${file}`
    }

    const filesArray = [];
    const files = s3.listObjects(params).createReadStream()
    const xml = new XmlStream(files)
    xml.collect('Key')
    xml.on('endElement: Key', (item) => {
      filesArray.push(item['$text'].substr(folder.length))
    })

    xml
      .on('end', function () {
        zip(filesArray)
      })

    const zip = (files) => {
      console.log(files)
      const fileOutput = fs.createWriteStream(join(__dirname, 'pixelart-generator.zip'))
      s3Zip
        .archive({ region: 'us-east-2', bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME, preserveFolderStructure: true }, folder, files)
        .pipe(fileOutput)
    }*/
    const fileParams = {
      ...constantParams,
      Key: `pixelate/compressed/${file}`,
      //Expires: expireTime - aws-sdk-v2
    }
    //const objectUrl = await s3.getSignedUrlPromise('getObject', fileParams)
    const getObjectCommand = new GetObjectCommand({
     ...fileParams
    });
    const downloadHandler = async(Key) => {
      try {
        // Defining filename n path
        let arr = Key.split("/")
        const fileName = arr[arr.length-1]
        //const savePath = path.join(__dirname,"..","downloads", fileName)

        const signedDLObject = await getDownloadURLObject()
        //const res = await downloadFiles(signedDLObject.url,savePath)
        return Promise.resolve(downloadFiles(signedDLObject,fileName))
         
      }
      catch (error) {
          return Promise.reject(error)
      }
    }
    const downloadFiles = async (downloadUrl, filePath) => {
      console.log('Download started')
      //console.log('The URL is: ', downloadUrl)
      return axios({
        method:'get', 
        url: downloadUrl,
        responseType:'blob'
        }) //responseType:'stream'
        .then(resp => {
          //const fileWriteStream = fs.createWriteStream(filePath)
          if (resp.status === 200){
            fileDownload(resp.data, filePath)
            //resp.data.pipe(filePath)
            //console.log(resp.data)
            console.log("Download Completed")
            return {
              success: "Download Complete!"
            }
          }
          else {
            throw new Error(`Error Occured ${resp.data}`)
          }
          
        }).catch(err=> {
          console.log(err)
          handleErrors(err)
          return {
            error: err
          }
        })
    }
    
    
    const  getDownloadURLObject = () => {
      //let encodedKey = encodeURI(key)
      //axios.get(`${customLoader}/api/item/?KEY=${encodedKey}`)
      return s3.getSignedUrlPromise('getObject', fileParams)
      
          /*.then(res => {
              if (res.status === 202) {
                  let respond = {
                    key: Key,
                    url: objectUrl,
                    expires: expireTime
                  }
                  res.status(StatusCodes.ACCEPTED).json(respond)
                  return res.data
              } else {
                  throw new Error(`Error Occured ${res.data}`)
              }
          }).catch(err => {
              console.log(err)
              //handleErrors(err)
          })*/
      }
    
    /*const customLoader = () => {
      return process.env.NODE_ENV === "production" ?
      `https://metatedstudio.com` : 'http://localhost:3030'
    }*/
    downloadHandler(fileParams.Key)
    
    
  } catch(err){
    handleErrors(err)
  }
}
{/*export default function handler(req,res){
  if (req.method=="GET"){
    aws()
  }else{
    res.status(405).send('Method Not Allowed')
  }
}*/}