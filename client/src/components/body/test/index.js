import React from 'react'
import { useState ,useEffect } from 'react'
import styles from './testcss.module.scss'

 
const Index = () => {


    const [ name , setName] = useState(false)

    console.log(name);
    const test = e => {
        setName(!name)
    }
    useEffect(() => {
        
    
        window.addEventListener('resize',test)
      return () => {
          window.removeEventListener('resize',test)
      }
    }, [])


    return (


        <>
            <button onClick={()=> setName(!name)}> click </button>

            <div className={`${styles.container} ${name ? styles.testtrue : styles.testfalse}`}>

                <div className={styles.boxChild}> child </div>


            </div>
        </>


    )
}

export default Index