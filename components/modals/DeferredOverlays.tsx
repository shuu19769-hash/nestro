"use client";
import dynamic from "next/dynamic";
import {useUiStore} from "@/lib/store";
const GlobalOverlays=dynamic(()=>import("./GlobalOverlays").then(module=>module.GlobalOverlays),{ssr:false});
export function DeferredOverlays(){const active=useUiStore(state=>state.searchOpen||state.wishlistOpen||state.quoteOpen||state.consultationOpen||Boolean(state.quickViewSlug));return active?<GlobalOverlays/>:null}
