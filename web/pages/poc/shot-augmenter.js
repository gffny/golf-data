import React, { useState } from 'react'
import styles from '../../styles/Map.module.css'
import GoogleMapReact from 'google-map-react'
import { map } from 'lodash/fp'

const courseLoc = [30.23553429301102, -87.88950192603103]

const shotMap = map(shot => <AnyReactComponent lat={shot.lat} lon={shot.lon} />)

const AnyReactComponent = ({ shotType = 'Start', lat, lon }) => {
  //obj.lat, obj.lng, obj.event
  console.log('init AnyReactComponent', shotType, lat, lon)
  return (
    <img
      src='http://www.gffny.com/favicon.ico'
      key={Date.now() + shotType}
      lat={lat}
      lng={lon}
      text={shotType}
    />
  )
}

export default function ShotAugmenter({ initialShots = [] }) {
  console.log('initialShots', initialShots)
  const [shots, setShots] = useState(initialShots)
  const addShot = ({ lat, lng: lon }) => {
    console.log('updating state? ', lat, lon)
    setShots(
      shots.concat({
        lat,
        lon,
      }),
    )
    console.log('shots?', shots)
  }
  return (
    <>
      <div className={styles.container}>
        <h1>Shot Augmenter</h1>
        <p>Time to add a little context to each of your shots!</p>
        <div className={styles.map}>
          <GoogleMapReact
            className={styles.subMap}
            onClick={addShot}
            heading={120}
            defaultZoom={19}
            defaultCenter={courseLoc}
          >
            {shotMap(shots)}
          </GoogleMapReact>
        </div>
        <div className={styles.map}>
          {/*
        http://fpoimg.com/300x250?text=Preview
        http://birdseye.garmin.com/birdseye/golf/006-d2471-23/gd16000/gid016091/006-d2471-23/0/hole1.jpghttp://birdseye.garmin.com/birdseye/golf/006-d2471-23/gd16000/gid016091/006-d2471-23/0/hole1.jpg?garmindlm=1609050843_906835611ce5ee6a6bff676a401a8ba6 */}

          <img src='http://birdseye.garmin.com/birdseye/golf/006-d2471-23/gd7000/gid007414/006-d2471-23/0/hole1.jpg?garmindlm=1609130054_be0ac732075c1744361beec8891b7338'></img>
        </div>
        <div className={styles.horizontalButtonBar}>
          <button className={styles.navButton}>Last Hole</button>
          <button className={styles.navButton}>Next Hole</button>
        </div>
      </div>
    </>
  )
}
