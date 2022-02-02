import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import store from './redux/store';

import VideoGameDetails from './components/VideoGameDetails';
import Landing from './components/Landing'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

describe('Landing page', () => {
  
  it("There must be a representative image", () => {
    render(<Provider store={store}> 
            <BrowserRouter>
              <Landing/>
            </BrowserRouter>
          </Provider>);
    const logo = screen.getByAltText('Videogames');
    expect(logo).toBeInTheDocument();    
  }); 

  it("There should be a button to enter home", () => {
    render(<Provider store={store}> 
            <BrowserRouter>
              <Landing/>
            </BrowserRouter>
          </Provider>);
    const home = screen.getByAltText("Press Start")
    expect(home).toBeInTheDocument();    
  });
});

describe('Videogame details', () => {
  
  it("Must show a loading element", () => {
    render(<Provider store={store}> 
            <BrowserRouter>
              <VideoGameDetails/>
            </BrowserRouter>
          </Provider>);
    const home = screen.getByText('Wait a moment while we look for the games')
    expect(home).toBeInTheDocument();    
  });
});
