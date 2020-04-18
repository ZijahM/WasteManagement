import { Template } from 'meteor/templating';
import { notes } from '../lib/collections.js';
import './main.html';


Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route ('/', function(){
  this.render('navbar', {
    to: "navbar"
  });
  this.render('display', {
    to: "main"
  });
});

Router.route ('/addForm', function(){
  this.render('navbar', {
    to: "navbar"
  });
  this.render('displayWithoutAdd', {
    to: "main"
  });
  this.render('addForm', {
    to: "addForm"
  });
});

Router.route ('/maps', function(){
  this.render('navbar', {
    to: "navbar"
  });
  this.render('maps', {
    to: "main"
  });
});

Router.route ('/cards', function(){
  this.render('navbar', {
    to: "navbar"
  });
  this.render('cards', {
    to: "main"
  });
});

Template.display.helpers({
/*
  notes:[
    {text: 'My note 1'},
    {text: 'My note 2'},
    {text: 'My note 3'}
  ]
  */
  notes(){
    return notes.find({});
  }
});

Template.displayWithoutAdd.helpers({
/*
  notes:[
    {text: 'My note 1'},
    {text: 'My note 2'},
    {text: 'My note 3'}
  ]
  */
  notes(){
    return notes.find({});
  }
});

  Template.addForm.events({
    'submit .add-form'(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;
      const text = target.text.value;

      // Insert a task into the collection
      notes.insert({
        text,
        createdAt: new Date(), // current time
      });

      // Clear form
      target.text.value = '';
    }
    });

  Template.display.events({
    'click .delete-note': function(){
      notes.remove(this._id);
      return false;
    }
  });

  Template.displayWithoutAdd.events({
    'click .delete-note': function(){
      notes.remove(this._id);
      return false;
    }
  });

  
