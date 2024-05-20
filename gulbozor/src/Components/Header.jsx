import icon from '../Images/Group.svg'
import {Link, Routes, Route, Navigate, useNavigate, useLocation} from 'react-router-dom'
import Home from '../Pages/Home/Home'
import NoPage from '../Pages/NoPage/NoPage'
import Shop from '../Pages/Shop/Shop'
import PlantCare from '../Pages/PlantCare/PlantCare'
import { useState } from 'react'
import Search from '../Images/search.svg'
import Savat from '../Images/savat.svg'
import Logout from '../Images/Logout.svg'
import Login from '../Components/Login'

function Header(){

	const NavLinks = [
		"Home",
		"Shop",
		"Plant care",
		"Blogs"
	]
	const navigate = useNavigate()

	const changeRoute = ()=>{
		navigate('/Home')
	}

	const currentRoute = useLocation().pathname;

	const [isSearching, setIsSearching] = useState(false)

	const makeSearch = ()=>{
		setIsSearching(!isSearching)
	}

	const [okLogin, setOkLogin] = useState(false)

	const changeOkLogin =() => {
		setOkLogin(!okLogin)
	}

	if(okLogin){
		document.body.style.overflow = "hidden"
	}else{
		document.body.style.overflow = "auto"
	}

	

	return(<>
	<div className="flex justify-center align-middle">
		<div className="w-[1200px] h-[60px] flex align-middle items-center justify-between border-b-2 border-grey mt-1">
				<img src={icon} alt="" className="w-[150px] h-[34px] cursor-pointer" onClick={changeRoute} />
				<ul className="flex gap-[50px]">
					{NavLinks.map((el, index) => {
						return	<li key={index}  className={currentRoute.replace("/", "") == (el == "Plant care" ? "Plant" : el) ? `${el} h-[60px] flex items-center border-b-2 font-semibold text-primary text-heading` : `${el} h-[60px] flex items-center text-blue-500 text-heading p-4`}><Link to={`/${el == "Plant care" ? "Plant" : el}`}>{el}</Link></li>
					})}

				</ul>
				<div className=" flex items-center gap-[30px] justify-end relative">
					<div className='flex gap-[5px] items-center'>
						<input type="text" className={isSearching ? "absolute top-0 right-[220px] flex focus-within:outline outline-primary bg-primary text-white rounded-[6px] pl-[4px]" : "hidden"} />
						<img src={Search} alt="search" onClick={makeSearch} className='cursor-pointer'/>
					</div>
					<img src={Savat} alt="savat" />
					<button className='w-[100px] h-[35px] bg-primary text-white flex gap-[4px] cursor-pointer items-center justify-center rounded-[6px] active:bg-secondary'
							onClick={changeOkLogin}>
						<img src={Logout} alt="login" />
						<span>Login</span>
					</button>
				</div>
		</div>
		
		{okLogin && <Login okLogin={okLogin} setOkLogin={setOkLogin}/>}
	</div>
		<Routes>
			<Route index element={<Home />} />
			<Route path='/Home' element={<Home />} />
			<Route path='/Shop' element={<Shop />} />
			<Route path='/Plant' element={<PlantCare />}/>
			<Route path='*' element={<NoPage />}/>
		</Routes>
	</>)
}

export default Header