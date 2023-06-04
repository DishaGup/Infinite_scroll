      "use client";
      import { GetServerSideProps } from 'next';
      import { useEffect, useState, useRef } from 'react';

      export default function Home() {
        const [initialProducts, setInitialProducts] = useState([]);

        const [currentPage, setCurrentPage] = useState(1);
        const loaderRef = useRef(null);
        const [isLoading, setIsLoading] = useState(false); 
        console.log(currentPage,'..page')
        useEffect(() => {
          const handleScroll = () => {
            if (
              window.innerHeight + window.scrollY >= document.body.offsetHeight &&
              !isLoading
            ) {
              if (currentPage <= 21) {
                // Fetch next page
                fetchMoreData();
              } else {
                // Reset to first page
                setCurrentPage(1);
              }
            }
          };
        
          window.addEventListener('scroll', handleScroll);

          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, [isLoading,currentPage]);


      //  useEffect(()=>{
      //  fetchMoreData()
      //  console.log("inside")
      //  },[])


      async function fetchMoreData() {
        try {
          setIsLoading(true);
          const nextPageProducts = await fetch(`https://erin-dizzy-clam.cyclic.app/trendify/products/all?limit=12&page=${currentPage}`).then((response) => response.json());
        
let nextProduct=nextPageProducts.products
          
          if (currentPage === 1) {
            setInitialProducts(nextProduct);
          } else {
          
            setInitialProducts((prevProducts) => [...prevProducts, ...nextProduct]);
          }

          setCurrentPage((prevPage) => prevPage + 1);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      }



        return (
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
          
          <div className="relative h-screen w-screen">
        <svg className="absolute -z-10 -top-10 opacity-20 " width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='120%' fill='hsla(0,0%,100%,1)'/><path d='M3.25 10h13.5M10 3.25v13.5'  strokeLinecap='square' stroke-width='0.5' stroke='hsla(258.5,59.4%,59.4%,1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)'/></svg>


            <div className="grid grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-4">
            
      {
      initialProducts.map((el,index)=>
      
      
      <div className="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md">
      <a href="#">
        <img className="h-60 rounded-t-lg object-cover" src={el.image} alt="product image" />
      </a>
      { el.reviews>200 ?( <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Sale</span>
      ):( <div
            className="bg-indigo-700 absolute transform -rotate-45 text-center text-white font-semibold py-1 left-[-34px] top-[32px] w-[170px]">
            Popular
          </div>)
      }
      
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-slate-900">{el.title}</h5>
        </a>
        <div className="mt-2.5 mb-5 flex items-center">
          
          <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{el.rating}</span>
          {Array.from({ length: Math.floor(el.rating) }).map((_, i) => (
        <svg key={i} aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
        </div>
        <div className="flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">${el.price}</span>
            <span className="text-sm text-slate-900 line-through">${el.price+511}</span>
          </p>
          <a href="#" className="flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Add to cart
      </a>
        </div>
      </div>
      </div>

      
      
      
      
      ) 
      }  
      {isLoading &&   <button className="flex items-center gap-x-4 rounded-xl bg-blue-600 px-8 py-3 font-medium text-white">
            <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading...</span>
          </button>
          }
      </div>
      </div>
          </main>
        );
      }
