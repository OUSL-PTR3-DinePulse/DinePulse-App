import logo from '../Assets/dinepulse-logo.png'
import bellico from '../Assets/bell.png'
import downloadIco from '../Assets/fi-rs-sign-in.png'
import user3d from '../Assets/User_perspective_matte.png'
import calender3d from '../Assets/Calendar_perspective_matte.png'
import graph3d from '../Assets/Chart_perspective_matte.png'
import gift3d from '../Assets/Gift_perspective_matte.png'
import poorIco from "../Assets/poor-ico.png";
import goodIco from "../Assets/good-ico.png";
import greatIco from "../Assets/great-ico.png";
import infoico from '../Assets/fi-rr-info.png'
import { useAdminAuth } from "../context/AdminAuthContext";

export default function Dashboard() {
  const { logoutAdmin } = useAdminAuth();
  

  return (
    <div className="bg-[#FAFACC] min-h-screen md:min-w-[35%]">

      <div className="w-screen flex flex-row bg-white items-center ">
        <img src={logo} alt="logo" className="max-w-[100px] ml-10 mr-auto"/>

        <div className="flex flex-col md:flex-row gap-5 md:gap-6 p-2 md:p-0 mr-10 ml-auto">
          

          <div className='flex flex-row gap-3  border p-2 rounded-lg shadow-md'>
            <img src={downloadIco} alt="download_icon"/>
            <div className='text-[#702517] font-bold'>Export Data</div>
          </div>

          <div className='flex flex-row gap-3  border p-2 rounded-lg shadow-md'>
            <img src={bellico} alt="bell_icon"/>
            <div className='text-[#702517] font-bold'>View Alerts</div>
          </div>

          <div className='flex flex-row gap-3  border px-8 py-2 rounded-lg shadow-md items-center bg-[#702517]' onClick={logoutAdmin}>
            <div className='text-white font-bold uppercase'>logout</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 md:gap-0 items-center mt-10">
        <div className="flex items-center bg-white gap-5 p-10 rounded-2xl mr-auto ml-auto">
          <div className="flex flex-col">
            <div className='text-gray-500 font-bold'>Total Feedback</div>
            {/* need to connect backend */}
            <div className='text-[#702517] font-bold text-3xl'>1593</div>
          </div>
          <img src={user3d} alt="user3dico" />
        </div>
        <div className="flex items-center bg-white gap-5 p-10 rounded-2xl mr-auto ml-auto">
          <div className="flex flex-col">
            <div className='text-gray-500 font-bold'>Total Feedback</div>
            {/* need to connect backend */}
            <div className='text-[#702517] font-bold text-3xl'>1593</div>
          </div>
          <img src={calender3d} alt="user3dico" />
        </div>
        <div className="flex items-center bg-white gap-5 p-10 rounded-2xl mr-auto ml-auto">
          <div className="flex flex-col">
            <div className='text-gray-500 font-bold'>Total Feedback</div>
            {/* need to connect backend */}
            <div className='text-[#702517] font-bold text-3xl'>1593</div>
          </div>
          <img src={graph3d} alt="user3dico" />
        </div>
        <div className="flex items-center bg-white gap-5 p-10 rounded-2xl mr-auto ml-auto">
          <div className="flex flex-col">
            <div className='text-gray-500 font-bold'>Total Feedback</div>
            {/* need to connect backend */}
            <div className='text-[#702517] font-bold text-3xl'>1593</div>
          </div>
          <img src={gift3d} alt="user3dico" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 md:gap-10 mt-10 justify-center font-bold text-[#702517]">
        {/*feedback distribution */ }
        <div className="flex flex-col bg-white gap-5 p-10 rounded-3xl min-w-[60%] ">
          <div>Feedback Distribution</div>
          <div className='flex items-center w-[100%] gap-10'>
            <img src={poorIco}/>
            <div className='flex flex-col gap-3 bg-white w-[80%]'>
              <div className='flex'>
                <div className='ml-0 mr-auto'>Unhappy</div>
                <div>10%</div>
              </div>
              <div className='w-full'>
                <div className='bg-gray-500 w-[100%] h-5 rounded-xl'/>
                <div className='bg-red-500 mt-[-20px] w-[10%] h-5 rounded-xl'></div>
              </div>
            </div>
          </div>
          <div className='flex items-center w-[100%] gap-10'>
            <img src={goodIco}/>
            <div className='flex flex-col gap-3 bg-white w-[80%]'>
              <div className='flex'>
                <div className='ml-0 mr-auto'>Neutral</div>
                <div>25%</div>
              </div>
              <div className='w-full'>
                <div className='bg-gray-500 w-[100%] h-5 rounded-xl'/>
                <div className='bg-yellow-500 mt-[-20px] w-[25%] h-5 rounded-xl'></div>
              </div>
            </div>
          </div>
          <div className='flex items-center w-[100%] gap-10 '>
            <img src={greatIco}/>
            <div className='flex flex-col gap-3 bg-white w-[80%]'>
              <div className='flex'>
                <div className='ml-0 mr-auto'>Happy</div>
                <div>65%</div>
              </div>
              <div className='w-full'>
                <div className='bg-gray-500 w-[100%] h-5 rounded-xl'/>
                <div className='bg-green-500 mt-[-20px] w-[65%] h-5 rounded-xl'></div>
              </div>
            </div>
          </div>
        </div>


        {/*active alerts*/}
        <div className='flex flex-col gap-5 bg-white w-[100%] md:w-[25%] p-10 rounded-3xl'>
          <div className="flex gap-3">
            <img src={infoico} className='max-h-7' />
            <div>Active Alerts</div>
          </div>
          <div className="flex flex-col  gap-5">
            <div className=" border border-red-500 bg-red-200 rounded-xl p-5">
              <div>Negative feedback received</div>
              <div className='text-base font-light'>5 mins ago</div>
            </div>
            <div className=" border border-yellow-500 bg-[#EDD6B2] rounded-xl p-5">
              <div>Low satisfaction today</div>
              <div className='text-base font-light'>2 hours ago</div>
            </div>
            <div className=" border border-yellow-500 bg-[#EDD6B2] rounded-xl p-5">
              <div>Low satisfaction today</div>
              <div className='text-base font-light'>2 hours ago</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 md:gap-10 mt-10 justify-center font-bold text-[#702517]">
        {/*feedback distribution */ }
        <div className="flex flex-col bg-white gap-5 p-10 rounded-3xl min-w-[60%] ">
          <div>Weekly Trends</div>
          
        </div>


        {/*Recent Feedback*/}
        <div className='flex flex-col gap-5 bg-white w-[100%] md:w-[25%] p-10 rounded-3xl'>
          <div className="flex gap-3">
            Recent Feedback
          </div>
          <div className="flex flex-col  gap-5">
            <div className="flex border   rounded-xl p-5 items-center">
              <div className="flex flex-col">
                <div className='text-base font-light'>15:32</div>
                <div>Great food and service</div>
              </div>
              <img src={greatIco} className='max-w-[70px] mr-0 ml-auto' />
            </div>
            <div className="flex border   rounded-xl p-5 items-center">
              <div className="flex flex-col">
                <div className='text-base font-light'>15:02</div>
                <div>No comment needed</div>
              </div>
              <img src={goodIco} className='max-w-[70px] mr-0 ml-auto' />
            </div>
            <div className="flex border   rounded-xl p-5 items-center">
              <div className="flex flex-col">
                <div className='text-base font-light'>14:47</div>
                <div>bad af</div>
              </div>
              <img src={poorIco} className='max-w-[70px] mr-0 ml-auto' />
            </div>
            
          </div>
        </div>
      </div>
      








      

    </div>
  );
}
