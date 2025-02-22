
import Navbar from '@/components/ui/Navbar'
import NatureVideo from '../assets/6394054-uhd_4096_2048_24fps.mp4'
import { useSelector } from 'react-redux'
const Home = () => {


  return (
    <div>

        <Navbar/>
        <div>
 
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute z-0 min-w-full min-h-full object-cover"
              >
                <source 
                  src={NatureVideo}
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
              
            </div>
      
    </div>
  )
}

export default Home
