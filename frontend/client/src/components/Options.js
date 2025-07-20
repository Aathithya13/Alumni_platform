import React from 'react'
import '../css/Option.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Navbar2 from './Navbar2';



function Options() {
    const navigate = useNavigate();
    const handleAlumni = () =>{
        navigate('/alumniregister');
    }
    const handleStudent = () =>{
        navigate('/studentregister');
    }
    const handleStaff = () =>{
        navigate('/staffRegister')
    }
  return (
    <div>
        <Navbar2/>
        <div className='option'>
            <div className='box' onClick={handleAlumni}>
                <FontAwesomeIcon icon={faGraduationCap} className='icon'/>
                <p>Alumni</p>
            </div>
            <div className='box' onClick={handleStaff}>
                <FontAwesomeIcon icon={faChalkboardUser} className='icon'/>
                <p>Admin</p>
            </div>
            <div className='box' onClick={handleStudent}>
                <FontAwesomeIcon icon={faUser} className='icon'/>
                <p>Student</p>
            </div>

        </div>
    </div>
  )
}

export default Options
