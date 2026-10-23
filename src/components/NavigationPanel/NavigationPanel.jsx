import "./NavigationPanel.css";
import TransitionLink from "../TransitionLink";
import AnimatedUnderline from './../AnimatedUnderline/AnimatedUnderline';
function NavigationPanel({ closePanel }) {
  const navItems = [
   { page:"Shop",path:'/store'},
   { page:"Campaign",path:'/'},
   { page:"About Us",path:'/'},
   { page:"Contact",path:'/'},
   { page:"Publication",path:'/'},

  ];

  return (
    <div className="navigation-panel">
       <div className="side-panel__header">
                  <span>MENU</span>
                   <span className='side-panel__close'
                    onClick={closePanel}>
                      <AnimatedUnderline color='black'>Close</AnimatedUnderline>
                      </span>
              </div>

      <nav className="navigation-list">
        {navItems.map((item, index) => (
          <TransitionLink
            to={item.path}
            className="navigation-item"
            key={index}
          >
            <span className="navigation-index">
              0{index + 1}
            </span>

            <span className="navigation-name">
              {item.page}
            </span>

            <span className="navigation-arrow">↗</span>
          </TransitionLink>
        ))}
      </nav>

      <div className="navigation-footer">
        <div className="navigation-links-wrapper">
            <span className="nav-link-head">Social Links</span>
            <span><AnimatedUnderline color='black'>Instagram</AnimatedUnderline></span>
            <span><AnimatedUnderline color='black'>LinkedIn</AnimatedUnderline></span>
            <span><AnimatedUnderline color='black'>Twitter/X</AnimatedUnderline></span>
         
        </div>

         <div className="navigation-links-wrapper">
            <span  className="nav-link-head">Quick Links</span>
          
                <span><AnimatedUnderline color='black'>Private Policy ↗</AnimatedUnderline></span>
                    <span><AnimatedUnderline color='black'>Terms & Conditions ↗</AnimatedUnderline></span>
  
        </div>
        
       
        {/* <span>© Your Brand</span>  */}
      </div>

   
    </div>
  );
}

export default NavigationPanel;