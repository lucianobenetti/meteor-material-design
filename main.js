Meteor.startup(function() {
    // Initialize material design effects when a template is rendered
    for (var name in Template) {
        // XXX Ugly hack to loop through user-defined templates
        if ( Template.hasOwnProperty(name)
             && Template[name].viewName
             && name.substring(0,2) !== '__'
             && name !== 'body'
           ) {

             var oldCallback = Template[name].rendered || null;

             var newCallback = function() {
                 // Init material design effects
                 displayMaterialDesignEffects();
                 Waves.displayEffect({duration: 500});
             };

             // Override the existing rendered callback
             (function(name, oldCallback, newCallback) {

                 Template[name].rendered = function() {
                     oldCallback && oldCallback.call( Template[name] );
                     newCallback();
                 };

             })(name, oldCallback, newCallback);
        }
    }
});