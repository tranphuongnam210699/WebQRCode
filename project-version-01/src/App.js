import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

// import component
import Navbar from './components/navbar';
import EditExercise from './components/editExercise';
import ExerciseList from './components/exerciseList';
import CreateExercise from './components/createExercise';
import CreateUser from './components/createUser';

function App() {
    return (
        <Router>
            <Navbar />
            <br />
            <div className='container'>
                <Route path='/' exact component={ExerciseList} />
                <Route path='/edit/:id' exact component={EditExercise} />
                <Route path='/create' exact component={CreateExercise} />
                <Route path='/user' exact component={CreateUser} />
            </div>
        </Router>
    );
}

export default App;
