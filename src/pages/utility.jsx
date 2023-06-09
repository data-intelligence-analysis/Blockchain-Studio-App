import Head from "next/head";
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import StraightIcon from '@mui/icons-material/Straight';
import {
  useWallet,
} from '@solana/wallet-adapter-react';
import {Responsive, WidthProvider} from "react-grid-layout";
import styled from "styled-components";
import DesktopWarnModal from "../components/layouts/DesktopWarnModal";
/*Grid Layout Components*/
const layout = [
  {i: "Web3 Blog", x:0, y:0, w:1, h:1},
  {i: "Marketplace", x:1, y:0, w:1, h:1},
  {i: "DAO", x:2, y:0, w:1, h:1},
  {i: "Gallery & Metaverse", x:3, y:0, w:1, h:1},
]
const ResponsiveGridLayout = WidthProvider(Responsive);

/* Grid Styled Component*/
const GridItemWrapper = styled.div`
  background-color: #414142;
  cursor: pointer;
  padding: 0px 10px 0px 10px;
  box-shadow: 2px 1.5px 4px 1px #414142;
  -webkit-box-shadow: 2px 1.5px 4px 1px #414142;
  &:hover {
      -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
      -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  }
`;

const GridItemContent = styled.div`
  padding: 10px;
  text-align: center;
  vertical-align: middle;
  line-height: 220px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
`;
const Root = styled.div`
  padding: 3px 25px 0px 25px;
`;


export default function Utility() {
  const wallet = useWallet();
  const {connected} = useWallet();
  const RenderConnectedWallet = () => {
    return (
      <>
        <div className="bg-slate-900 h-screen">
          <div className="flex relative text-center items-center h-full overflow-y-auto">
            <div className="absolute mt-40 pt-40 pb-20 sm:my-10 sm:pt-40 md:pt-20 md:my-20 md:pb-5 lg:my-40 lg:pt-20 lg:pb-20 justify-center mx-auto w-full">
              <Root draggable={false}>
                <ResponsiveGridLayout
                  layouts= {{lg:layout}}
                  breakpoints={{ lg: 1000, md: 850, sm: 650, xs: 450, xxs: 0}}
                  cols={{ lg: 4, md: 3, sm: 2, xs: 2, xxs: 1}}
                  rowHeight={250}
                  width={700}
                  compactType={'horizontal'}
                  isDraggable={false}
                >
                  {/*<GridLayout layout= {layout} cols= {4} rowHeight= {200} width= {900}>*/}
                  <GridItemWrapper key="Web3 Blog">
                      <a href="https://metateds.com" target="_blank" rel="noreferrer">
                          <GridItemContent>Web3 Blog</GridItemContent>
                      </a>
                  </GridItemWrapper>
                  <GridItemWrapper key="Marketplace">
                      <a href="https://solsurfer.xyz/#/" target="_blank" rel="noreferrer">
                          <GridItemContent>Marketplace</GridItemContent>
                      </a>
                  </GridItemWrapper>
                  <GridItemWrapper key="DAO">
                      <a href="https://metateds.com/dao" target="_blank" rel="noreferrer">
                          <GridItemContent>DAO</GridItemContent>
                      </a>
                  </GridItemWrapper>
                  <GridItemWrapper key="Gallery & Metaverse">
                      <a href="https://metateds.com/gaming" target="_blank" rel="noreferrer">
                          <GridItemContent>Gaming</GridItemContent>
                      </a>
                  </GridItemWrapper>
                {/*</GridLayout>*/}
                </ResponsiveGridLayout>
                  
              </Root>
            </div>
          </div>
          {/*<div className="flex items-center justify-center min-h-screen overflow-auto">
            <h1>Grid</h1>
          </div>*/}
        </div> 
      </>
    )
  } 
  try{
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
        console.log('PublicKey: ' + walletAddress)
    }
  }catch(e){console.log(e)}
  return (
    <>
      <Head>
        <title>🛠 Utility | MetaTeds</title>
      </Head>
      <NavBar bgFormat={"bg-slate-900/80"} />
        {!connected && !wallet.publicKey ?
          (
            <>
              <DesktopWarnModal />
              <div className="bg-slate-900 h-screen grid grid-cols-8 gap-10">
                <div className="place-items-center my-auto col-start-2 col-span-6 text-center">
                  <h1 className="hidden sm:block text-lg sm:text-xl lg:text-3xl">🎉 Select wallet above </h1>
                  <h1 className="sm:hidden block text-lg sm:text-xl lg:text-3xl">🎉 Select wallet in Items Menu </h1>
                </div>
              </div>
            </>
          ):
          (
            RenderConnectedWallet()
          )
        }
      <Footer bgFormat={"bg-slate-900/80"}/>
    </>
  );
  
}

//<div className="my-auto md:col-span-9 lg:col-span-10 xl:col-span-10 text-center items-cente"></div>