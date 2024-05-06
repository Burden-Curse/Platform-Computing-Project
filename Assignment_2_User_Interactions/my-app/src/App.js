import logo from './logo.svg';
import './App.css';
import img1 from './images/childhooddadandme.jpg';
import img2 from './images/dad.jpg';
import img3 from './images/mom.JPG';

function App() {
  return (
    <div className="App">
      <header className="App-header">

<div>
  {/*requirement: Includes a .css file to style with at least 4 ways to format the elements in the html.Includes a .css file to style with at least 4 ways to format the elements in the html.*/}
  {/*requirement: Applies different font(s)*/}
  {/*requirement: Applies border and margins*/}
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  {/*requirement: Modifies title in head so that the tab has a unique name, (e.g. About Me).*/}
  <title>About Me</title>
  <link rel="stylesheet" href="style.css" />
  <a href="https://github.com/ceeeeeeek/Platform_Computing" target="_blank" title="This takes you to my Github">
    <button style={{fontSize: 25, backgroundColor: 'grey', color: 'lightblue', borderRadius: 25}}>github repo -&gt; Platform_Computing</button>
  </a>
  <br />
  {/*requirement: Uses a mix of headers, paragraphs, and div's.*/}
  <h1><span style={{backgroundColor: 'rgb(163, 222, 180)'}}>A Brief Intro to My Life: Christian Kyle Napuli</span></h1>
  <hr />
  {/*requirement: Includes a link that directs to your Github account (can be main account or specifically to your Platform_Computing Repo)*/}
  <a href="https://github.com/ceeeeeeek/Platform_Computing" target="_blank" title="This takes you to my Github">
    {/*requirement: Includes at least one image.*/}
    <img src={img1} width={700} height={300} alt="This is a picture of me" title="Mom and I at Disneyland" />
  </a>
  <a href="https://github.com/ceeeeeeek/Platform_Computing" target="_blank" title="This takes you to my Github">
    <img src={img2} height={300} alt="This is a picture of me" title="Dad and I: BEFORE" />
  </a>
  <a href="https://github.com/ceeeeeeek/Platform_Computing" target="_blank" title="Striking resemblence between my dad and I">
    <img src={img3} height={300} alt="This is a picture of me" title="Dad and I: AFTER" />
  </a>    
  <br />
  Various photos of me and my family at different stages of life (click any photo to be directed to github repo)
  <hr />
  {/*requirement: Includes at least 3 paragraphs.*/}
  <h2><div style={{backgroundColor: 'cyan'}}>Background</div></h2>
  <p id="p1"> Welcome to my first ever website! 
    My name is Christian Kyle Dos Pueblos Napuli. 
    I am 24 years old born and raised in California. 
    I am of Filipino descent but I am a first generation born here in America.
    I am a 4th year student at CSUSB. </p>
  <br />
  <h2><div style={{backgroundColor: 'rgb(102, 102, 219)'}}>Hobbies &amp; Interests</div></h2>
  <p id="p2"> In my free time, I like to live an active lifestyle that includes activities such as playing basketball and weightlifting.
    I embrace the standard American diet and enjoy eating at In-N-Out and Chick-Fil-A, my favorite fast food places, especially after a good workout.
    Additionally, I  give praise to Asian cuisine on occasion and enjoy eating Korean Barbeque and sushi as well.
    However, I also give homage to my Filipino heritage by eating Flipino meals such as lechon, which is roasted pig, and turon, which is fried banana.
    Suffice to say, I love rewarding a good workout by eating food with plenty of carbs and protein. 
  </p>    
  <br />
  <h2><div style={{backgroundColor: 'rgb(192, 22, 192)'}}>Plans for the future</div></h2>
  <p id="p3"> I like to compartmentalize the stages of my life. 
    That's a fancy way of saying I have tunnel vision and have not thought about my future that in depth yet.
    I am learning as I go.
    Although I have had some ideas in passing, I do not want to spend a majority of the day planning that far, as plans tend to change and usually does not go exactly as anticipated.  
    This myopia is incredibly practical and helpful in calming unnecessary anxiety, as it allows me to focus on my current lifestyle only, which is graduating with my degree in Computer Science as fast as possible.
    As for the rest of my life, I will cross that bridge when I get there, but for now I plan to take on every day one assignment and one protein bar at a time.
  </p>   
  <br />
  <footer style={{backgroundColor: 'rgb(163, 222, 180)'}}>
    <hr />
    author: Christian Kyle Napuli
    <br />
  </footer>
</div>

      
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
