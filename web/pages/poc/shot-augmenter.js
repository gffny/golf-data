import styles from '../../styles/Map.module.css'
import GoogleMapReact from 'google-map-react'

const CULLION_CENTER = [53.552751719702016, -7.3316516565845795]
const AnyReactComponent = ({ text, lat, lng }) => (
  <div lat={lat} lng={lng}>
    {text}
  </div>
)

export default function ShotAugmenter() {
  const places = [
    {
      id: 1,
      name: 'Gffny HQ',
      geometry: {
        location: {
          lat: CULLION_CENTER[0],
          lng: CULLION_CENTER[1],
        },
      },
    },
  ]
  return (
    <div className={styles.container}>
      <h1>Shot Augmenter</h1>
      <p>Time to add a little context to each of your shots!</p>
      <div className={styles.map}>
        <GoogleMapReact defaultZoom={15} defaultCenter={CULLION_CENTER}>
          {places.map(place => (
            <AnyReactComponent
              key={place.id}
              lat={place.geometry.location.lat}
              lng={place.geometry.location.lng}
              text={place.name}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  )
}
