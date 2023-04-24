import './App.css';
import Cars from './components/Cars';

function App() {
  return (
    <div>
      <Cars />
    </div>
  );
}

export default App;

/* Note to reviewer:
I used a lot of past projects and notes to complete this task. I also watched a few youtube videos to help get to 
grips with MongoDB and how to make sure the CRUD operations were completed properly. 
I kept getting an error when testing originally, and looking in the console I noticed the same error popped up as in my last 
project which had to do with cors. So again, I used the information from my last project to import and use cors, and then 
it worked just fine. 
All files were formatted with Prettier.

Sources used:
Task notes
Previous project sources including: https://www.w3schools.com/tags/ref_httpmethods.asp
https://legacy.reactjs.org/docs/hooks-state.html
https://legacy.reactjs.org/docs/hooks-effect.html
https://legacy.reactjs.org/docs/handling-events.html
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
https://stackoverflow.com/questions/46337471/how-to-allow-cors-in-react-js
*/
