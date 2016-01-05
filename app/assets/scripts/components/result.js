import React from 'react';
import utils from '../utils';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { fetchJurisdiction, stateChangeToFalse } from '../actions';

let Result = React.createClass({

  componentDidMount: function () {
    this._getJurisdictions(this.props);
  },

  componentWillUpdate: function () {
    if (this.props.stateChange.status) {
      this.props.boundStateChangeToFalse()
      this._getJurisdictions(this.props);
    }
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.stateChange.status == this.props.stateChange.status;
  },

  render: function () {

    let { jurisdiction } = this.props;

    // translate(this.props.jurisdiction)
    
    var props = this.props.jurisdiction;

    if(props.must_have_email == "N"){
      var emailcheck = "do not";
    }else{
      var emailcheck = "";
    };

    if(props.office_address !== null){
        var officeAddress = "Office Address: "+props.office_address;
    }else{
        var officeAddress = "";
    };

    if(props.mailing_address == props.office_address){
      if(props.mailing_address !== null){
          var mailAddress = "";
      }else{
        var mailAddress = "Mailing Address: "+props.mailing_address;
      };
    }else{
      var mailAddress = "";
    };

    if(props.post_training_exam == "N"){
      var trainingcheck = "";
    }else if(props.post_training_exam == "Y"){
      var trainingcheck = "Wubalubadubdub"
    }else{
      var trainingcheck = props.post_training_exam;
    };

    if(props.city = "false"){
      var juris_type = "city";
    }else{
      var juris_type = "county";
    };

    if(props.registration_status == "S"){
      var registration = "You can be registered anywhere in the state to work on Election Day in " +props.name+ ".";
    }else if(props.registration_status == "J" ){
      var registration = "You must be registered in props.name to work on Election Day in this " +juris_type+ ".";
    }else{
      var registration = "";
    };

    if(props.pre_registration = "N"){
      var preRegistration = "Pre-Registration is available and is not required for 16-17 year olds to vote.";
    }else if(props.pre_registration = "Y"){
      var preRegistration = "Pre-Registration is available and is required for 16-17 year olds to vote.";
    }else{
      var preRegistration = "";
    };

    if(props.high_school_student = "Y"){
      var highSchool = "High School students are eligible";
    }else{
      var highSchool = ""
    };

    if(props.full_day_req = "Y"){
      var fullDay = "You must work the full day.";
    }else{
      var fullDay = "You can split the day with another election worker.";
    }

    if(props.compensation !== null){
      var compensation = "The compensation for election workers is " +props.compensation;
    }else{
      var compensation = "";
    }

    if(props.interview == "Y"){
      var interview = "People who sign up to work on Election Day are interviewed by the local election official’s staff."
    }else{
      var interview = "There is no formal interview requirement."
    };

    if(props.training == "Y"){
      var training = "You must attend a training session to prepare you for working on Election Day.";
    }else{
      var training = "";
    };

    if(props.complete_training !== "N"){
      var complete_training = "You must complete training for each election";
    }else{
      var complete_training = "Once you are trained, you do not need to attend training for each election. The local election official will let you know when new training is required.";
    };

    if(props.post_training_exam = "Y"){
      var training_exam = "an";
    }else{
      var training_exam = "no";
    };

    if(props.must_have_email = "Y"){
      var must_have_email = "You are required to have an email address and access to a computer and the Internet."
    }else if(props.must_have_email = "N"){
      var must_have_email = "";
    }else{
      var must_have_email = props.must_have_email;
    };

    if(props.candidate_prohibition = "Y"){
      var candidate_prohibition = "If you are a candidate on the ballot, related to or working for a candidate on the ballot for the election, tell the local election official (county clerk / municipal clerk / county election commission) when you sign up, since there are often restrictions for these individuals serving as election workers.";
    }else if(props.canidate_prohibition = "N"){
      var candidate_prohibition = ""
    }else{
      var candidate_prohibition = props.candidate_prohibition;
    };



    // Set up wordings for the Jursidiction page from the properties 

    // Results HTML
    return (
      <div className="large">
        <div className="banner-image">
          <img src='/assets/graphics/layout/main_reduced.jpg' width="100%"/>
        </div>
        <div id="results-container">
          <div className="columns medium-centered">
            <div className="results-sub-container columns large medium-centered">
              <div className="results-split-container medium-5 columns">
                <div className="juris-header">{jurisdiction.name}, {jurisdiction.state.alpha}</div>
                <div className="county-image">
                  <img src="assets/graphics/layout/dummyjurs.svg"></img>
                </div>
                <div className="text-header">Contact Information</div>
                <p>If you have questions about working on Election Day contact your county or jurisdiction.</p>
                <p>Telephone: {jurisdiction.telephone}</p>
                <p>{ officeAddress }</p>
                <p>{ mailAddress } </p>
                <p><a href="{jurisdiction.website}">Click here</a> for more information on working Election Day in this jurisdiction.</p>
                <p><a href="{jurisdiction.application">Click here</a> to sign up as an election worker.</p>
              </div>
              <div className="results-split-container medium-6 columns">
                <div className="text-header">Work Hours:</div>
                  <p>{jurisdiction.hours_start} to {jurisdiction.hours_end}</p>

                <div className="text-header">Registration:</div>
                  <p>{registration}</p>
                  <p>{preRegistration}</p>
                  <p>{highSchool}</p>
                  <p>You must be at least {jurisdiction.minimum_age} in order to serve as an election worker.</p>
                  <p>You { emailcheck } need an email to register.
                  </p>                  
                  <p>Split days allowed: {jurisdiction.split_days_allowed}</p>
                  <p>{trainingcheck}</p>
                  <p>There is {training_exam} exam during the training session.</p>
                </div>
                <div className="results-below-container medium-12 columns">
                  <div className="btn">Work the election in your jursidiction!</div>
                  <p><a href="">Return to Jursidiction Selection</a></p>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  },

  _getJurisdictions: function (v) {
    let id = v.params.name;
    let { boundFetchJurisdiction } = v
    utils.fetchJurisditction(id, boundFetchJurisdiction.bind(null));
  }

});

function mapStateToProps (state) {
  return {
    jurisdiction: state.jurisdiction,
    stateChange: state.stateChange
  };
}

function mapDispatchToProps (dispatch) {
  return {
    boundFetchJurisdiction: function (data) {
      dispatch(fetchJurisdiction(data));
    },
    boundStateChangeToFalse: function() {
      dispatch(stateChangeToFalse())
    }
  };
}

function translate(properties){
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result);
