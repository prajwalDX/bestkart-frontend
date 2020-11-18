import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Products from './components/Products';
import {  BrowserRouter as Router , Route, Switch } from 'react-router-dom'
import Productdetails from './components/Productdetails';
import Cart from './components/Cart';

import Signin from './components/Signin';
import Register from './components/Register';
import Notfound from './components/404';
import Backoffice from './components/Backoffice';
import Shipping from './components/Shipping';
import Payment from './components/Payment';
import Success from './components/Success';
import Cancel from './components/Cancel';




function App() {


  return (
   <> <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Products} />
        <Route path='/product/:id' component={Productdetails} />
        <Route path='/cart/:id?' component={Cart} />
        <Route path='/signin' component={Signin} />
        <Route path='/register' component={Register} />
        <Route path='/shipping' component={Shipping} />
        <Route path='/payment' component={Payment} />
        <Route path='/success' component={Success} />
        <Route path='/cancel' component={Cancel} />
        <Route path='/superadmin' component={Backoffice} />
 
        



        <Route  component={Notfound} />

      </Switch>
      <Footer />
      </Router>
   </>
  );
}

export default App;
