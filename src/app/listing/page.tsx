"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./listing.module.css";
import Yearlist from "../components/YearList/Yearlist";
import { usePage } from "../context/PageContextProvider";
import { useIntersection } from "@mantine/hooks";
import Genre from "../components/Genre/Genre";
import { fetcher } from "../utils/fetcher";
import useSWR from "swr";
import { queryParams } from "@/constants/queryParams";
import { BASE_URL } from "@/constants/urls";
import { throttle } from "@/utils/throttle";

function Page(props: any) {
  const [init, setInit] = useState(false);
  const topScrollerRef = useRef();
  const yearListRef = useRef();

  const { ref: topRef, entry: topEntry } = useIntersection({
    root: topScrollerRef.current,
    threshold: 0.99,
  });

  const { data, error, isLoading } = useSWR(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d",
    fetcher
  );

  const { state, dispatch } = usePage();

  const bottomScrollerRef = useRef();
  const { ref: bottomRef, entry: bottomEntry } = useIntersection({
    root: bottomScrollerRef.current,
    threshold: 0.9,
  });

  useEffect(() => {
    if (!init) {
      setInit(true);
    } else {
      if (topEntry?.isIntersecting) {
        throttle(dispatch({ type: "SCROLL_UP" }),1000)  
      }else if(bottomEntry?.isIntersecting ){
          throttle(dispatch({type:'SCROLL_DOWN'}),1000)
      }
    }
  }, [topEntry,bottomEntry]);

  const getLink = (genre: any) => {
    // @ts-ignore
    let prevGenres = [];
    let _active = false;
    if (typeof props?.searchParams?.genre === "string") {
      prevGenres = [Number(props?.searchParams?.genre)] || [];
    } else if (Array.isArray(props?.searchParams.genre)) { 
      prevGenres = props?.searchParams?.genre.map(Number) || [];
    }

    if (!prevGenres.includes(genre)) {
      prevGenres.push(genre);
    }else{
      // @ts-ignore
      prevGenres = prevGenres.filter(g => g !== genre);
      _active = true;
    }
    const res = prevGenres.join("|");
    const _pageLink = prevGenres.join("&genre=");
    let newQuery = { ...queryParams, with_genres: `${res}` };
    // @ts-ignore
    const queryString = new URLSearchParams(newQuery).toString();
    return { apiLink: `${BASE_URL}?${queryString}`, pageLink: _pageLink, active:_active };
  };


  return (
    <main>
      <div className={styles.main_wrapper}>
        <div className={styles.genreWrapper}>
          {/* Genre Chips wrapper */}
          {data?.genres.map((item: any, index: any) => {
            return (
              <Genre
                link={getLink(Number(item.id)).pageLink}
                active={getLink(Number(item.id)).active}
                key={index}
                item={item}
              />
            );
          })}
        </div>
        <div className={styles.container}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "100vh",
            }}
          >
            {/* Top Observer  */}
            {/* @ts-ignore */}
            {!yearListRef?.current?.returnLoading() && (<> <div style={{minHeight: "50px",border: "1px solid #00000094",background: "#00000094",}}ref={topRef}></div></>)}
            {/* @ts-ignore */}
            {state.years.map((year, index) => {
              return <Yearlist key={index} ref={yearListRef} props={props} year={year} />;
            })}
            {/* @ts-ignore */}
            {!yearListRef?.current?.returnLoading() && (<><div ref={bottomRef}>Bottom Loading</div></>)} 
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
