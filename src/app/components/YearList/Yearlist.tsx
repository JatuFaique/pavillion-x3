"use client";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import MovieCard from "@/app/components/MovieCard/MovieCard";
import styles from "./yearlist.module.css";
import { usePage } from "@/app/context/PageContextProvider";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

const Yearlist = forwardRef(({ year, props,ref }: any)=> {
  const defaulScrollerRef = useRef();
  const { state } = usePage();
  // @ts-ignore
  let prevGenres = [];
  if (typeof props?.searchParams.genre === "string") {
    prevGenres = [props?.searchParams?.genre] || [];
  } else if (typeof props?.searchParams.genre === "object") {
    prevGenres = [...props?.searchParams?.genre] || [];
  }
  // @ts-ignore
  const res = prevGenres.join("=");
  console.log("papa", res);

  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100&with_genres=${res}`,
    fetcher
  );

  useEffect(() => {
    if (Number(year) === Number(state.defaultYear)) {
      // @ts-ignore
      defaulScrollerRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }else {
      // @ts-ignore
      defaulScrollerRef?.current?.scrollIntoView({
        behavior: "instant",
        block: "end",
      });
    }
  }, [data]);

  useImperativeHandle(ref, () => ({
    returnLoading: () => {
      return isLoading
    }
  }));

  
  return (
  //@ts-ignore
    <div ref={defaulScrollerRef}  >
      <h1 style={{color:'#ffffff', padding:'12px 8px'}}> {year}</h1>
      {/*@ts-ignore*/}
      <div className={styles.moviesWrapper}>
        {data?.results?.map((item: any, index: Number) => {
          // @ts-ignore
          return <MovieCard key={index} item={item} />;
        })}
      </div>
      
    </div>
  );
})

export default Yearlist;
