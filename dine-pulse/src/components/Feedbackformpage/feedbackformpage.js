import React, { useState } from 'react'
import './feedbackformpage.css'
import logoImage from '../Assests/dinepulse-logo.png'
import left from '../Assests/fi-rr-angle-left.png'
import poorIco from '../Assests/poor-ico.png'
import goodIco from '../Assests/good-ico.png'
import greatIco from '../Assests/great-ico.png'



const Feedbackformpage = () => {
    const [activeLang, setActiveLang] = useState('En');
    const [selectedReaction, setSelectedReaction] = useState(null);
    const handleLangChange = (lang) => {
        setActiveLang(lang);
        console.log(`Language switched to: ${lang}`);
    };
    const handleReactionClick = (reaction) => {
        setSelectedReaction(reaction);
        console.log(`Reaction selected: ${reaction}`);
    };
    
  return (
    <div className='page-container'>
      <div className="logo-container">
        <div className='back-button'>
            <img src={left} alt="back" className="back-ico" />
        </div>
        <img src={logoImage} alt="DinePulse Logo" className="logo" />
        <div className='language-button'>
            <div 
                className={activeLang === 'En' ? 'active-lang' : ''}
                onClick={() => handleLangChange('En')}
            >
                En
            </div>
            |
            <div 
                className={activeLang === 'Sin' ? 'active-lang' : ''}
                onClick={() => handleLangChange('Sin')}
            >
                Sin
            </div>
        </div>
      </div>
      <div className='form-container'>
        <div className='form'>
        <div className='exp-text'>How was your dining experience at</div>
        <div className='resturant-name'>The Golden Spoon Restaurant?</div>
        <div className='reaction-container'>
                        <div 
                            className={`reaction-poor ${selectedReaction === 'Poor' ? 'selected-reaction' : ''}`}
                            onClick={() => handleReactionClick('Poor')}
                        >
                            <img src={poorIco} alt='ico' />
                            <div>Poor</div>
                        </div>
                        <div 
                            className={`reaction-okay ${selectedReaction === 'Okay' ? 'selected-reaction' : ''}`}
                            onClick={() => handleReactionClick('Okay')}
                        >
                            <img src={goodIco} alt='ico' />
                            <div>Okay</div>
                        </div>
                        <div 
                            className={`reaction-great ${selectedReaction === 'Great' ? 'selected-reaction' : ''}`}
                            onClick={() => handleReactionClick('Great')}
                        >
                            <img src={greatIco} alt='ico' />
                            <div>Great</div>
                        </div>
                    </div>
        <textarea rows={4} placeholder="Any Comments?" className="comment-box" />
        <div className='submit-button' style={{ backgroundImage: selectedReaction ? 'linear-gradient(to right, #702517, #C57C0C)' : '',color: selectedReaction ? 'white' : 'black' }}> Submit Feedback</div>
        <div className='bottom-text'>Please select a rating to continue</div>
        </div>

      </div>
    </div>
  )
}

export default Feedbackformpage
