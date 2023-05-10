import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useDispatch} from "react-redux";
import {changeToHomePage} from "@/reducers/appRoutes/appRoutesReducer";
import {useEffect} from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(changeToHomePage);
    }, [])

  return (
      <div className={"h-screen"}>
        This is homepage
      </div>
  )
}
