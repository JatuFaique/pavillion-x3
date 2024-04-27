import React from 'react';
import styles from './genre.module.css'

function Genre({active,item,link}:any) {

  return (
    <a href={`/listing?genre=${link}`}>
        <div className={`${styles.genre} ${active ?styles.active:''}`}>{item.name}</div>
    </a>
  )
}

export default Genre