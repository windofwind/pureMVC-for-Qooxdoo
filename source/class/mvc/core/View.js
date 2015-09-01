/*
 * Created by Wind on 1/28/14.
 */

/**
 * A Singleton <code>IView</code> implementation.
 *
 * <P>
 * In PureMVC, the <code>View</code> class assumes these responsibilities:</P>
 * <UL>
 * <LI>Maintain a cache of <code>IMediator</code> instances.</LI>
 * <LI>Provide methods for registering, retrieving, and removing <code>IMediators</code>.</LI>
 * <LI>Notifiying <code>IMediators</code> when they are registered or removed.</LI>
 * <LI>Managing the observer lists for each <code>INotification</code> in the application.</LI>
 * <LI>Providing a method for attaching <code>IObservers</code> to an <code>INotification</code>'s observer list.</LI>
 * <LI>Providing a method for broadcasting an <code>INotification</code>.</LI>
 * <LI>Notifying the <code>IObservers</code> of a given <code>INotification</code> when it broadcast.</LI>
 * </UL>
 *
 * @see mvc.patterns.Mediator Mediator
 * @see mvc.patterns.observer.Observer Observer
 * @see mvc.patterns.observer.Notification Notification
 */

qx.Class.define("mvc.core.View", {
//    type:"singleton",
    extend: qx.core.Object,
    implement : mvc.interfaces.IView,

    /*
     *****************************************************************************
     STATICS
     *****************************************************************************
     */
    statics: {
        _instance:null,
        getInstance:function() {
            if (this._instance == null) {
                this._instance = new this();
            }
            return this._instance;
        },

        removeInstance:function() {
            if (this._instance) {
                this._instance.dispose();
                this._instance = null;
            }
        }
    },

    /*
     *****************************************************************************
     CONSTRUCTOR
     *****************************************************************************
     */
    construct: function () {
        this.base(arguments);

        this._mediatorMap = {};
        this._observerMap = {};
        this._initializeView();
    },

    /*
     *****************************************************************************
     EVENTS
     *****************************************************************************
     */
    events: {
    },

    /*
     *****************************************************************************
     PROPERTY
     *****************************************************************************
     */
    properties: {
    },

    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        _mediatorMap:null,
        _observerMap:null,

        /**
         * Initialize the Singleton View instance.
         *
         * <P>
         * Called automatically by the constructor, this
         * is your opportunity to initialize the Singleton
         * instance in your subclass without overriding the
         * constructor.</P>
         *
         * @return {void}
         */
        _initializeView:function( ) {

        },

        /**
         * Register an Observer to be notified of Notifications with a given name
         *
         * @param notificationName {String}
         *  The name of the Notifications to notify this Observer of
         * @param observer {mvc.patterns.observer.Observer} observer
         *  The Observer to register.
         * @return {void}
         */
        registerObserver:function( notificationName, observer ) {
            var observers = this._observerMap[ notificationName ];

            if( observers ) {
                observers.push( observer );
            } else {
                this._observerMap[ notificationName ] = [ observer ];
            }
        },

        /**
         * Notify the Observersfor a particular Notification.
         *
         * All previously attached Observers for this Notification's
         * list are notified and are passed a reference to the INotification in
         * the order in which they were registered.
         *
         * @param notification {mvc.interfaces.INotifier}
         *  The Notification to notify Observers of
         * @return {void}
         */
        notifyObservers:function( notification ) {
            if( this._observerMap[ notification.getNotificationName() ] != null ) {

                // Get a reference to the observers list for this notification name
                var observers_ref = this._observerMap[ notification.getNotificationName() ];

                observers_ref.forEach(function(item, index, Array) {
                    item.notifyObserver( notification );
                });
                // Copy observers from reference array to working array,
                // since the reference array may change during the notification loop
//                var observers = [];
//                var observer;
//
//                for (var i = 0; i < observers_ref.length; i++) {
//                    observer = observers_ref[ i ];
//                    observers.push( observer );
//                }
//
//                // Notify Observers from the working array
//                for (i = 0; i < observers.length; i++) {
//                    observer = observers[ i ];
//                    observer.notifyObserver( notification );
//                }
            }
        },

        /**
         * Remove the Observer for a given notifyContext from an observer list for
         * a given Notification name
         *
         * @param notificationName {String}
         *  Which observer list to remove from
         * @param notifyContext {Object}
         *  Remove the Observer with this object as its notifyContext
         * @return {void}
         */
        removeObserver:function( notificationName, notifyContext) {
            // the observer list for the notification under inspection
            var observers = this._observerMap[ notificationName ];


            var ob;
            // find the observer for the notifyContext
            for ( var i = 0; i<observers.length; i++ )
            {
                if ( observers[i].compareNotifyContext( notifyContext ) == true ) {
                    // there can only be one Observer for a given notifyContext
                    // in any given Observer list, so remove it and break
//                    observers.splice(i,1);
                    ob = qx.lang.Array.removeAt(observers, i);
                    ob.dispose();
                    break;
                }
            }

            // Also, when a Notification's Observer list length falls to
            // zero, delete the notification key from the observer map
            if ( observers.length == 0 ) {
                delete this._observerMap[ notificationName ];
            }
        },

        /**
         * Register a Mediator instance with the View.
         *
         * Registers the Mediator so that it can be retrieved by name,
         * and further interrogates the Mediator for its
         * {@link puremvc.Mediator#listNotificationInterests interests}.
         *
         * If the Mediator returns any Notification
         * names to be notified about, an Observer is created encapsulating
         * the Mediator instance's
         * {@link puremvc.Mediator#handleNotification handleNotification}
         * method and registering it as an Observer for all Notifications the
         * Mediator is interested in.
         *
         * @param mediator {mvc.interfaces.IMediator}
         *  a reference to the Mediator instance
         */
        registerMediator:function( mediator ) {
            // do not allow re-registration (you must to removeMediator fist)
            if ( this._mediatorMap[ mediator.getMediatorName() ] != null ) {
                return;
            }

            // Register the Mediator for retrieval by name
            this._mediatorMap[ mediator.getMediatorName() ] = mediator;

            // Get Notification interests, if any.
            var interests = mediator.listNotificationInterests();

            // Register Mediator as an observer for each of its notification interests
            if ( interests.length > 0 )
            {
                // Create Observer referencing this mediator's handlNotification method
                var observer = new mvc.patterns.observer.Observer( mediator.handleNotification, mediator );

                // Register Mediator as Observer for its list of Notification interests
                for ( var i=0;  i<interests.length; i++ ) {
                    this.registerObserver( interests[i],  observer );
                }
            }
        },

        /**
         * Check if a Mediator is registered or not
         *
         * @param mediatorName {String}
         * @return {Boolean} whether a Mediator is registered with the given <code>mediatorName</code>.
         */
        hasMediator:function( mediatorName ) {
            return this._mediatorMap[ mediatorName ] != null;
        },

        /**
         * Retrieve a Mediator from the View
         *
         * @param mediatorName {String}
         *  The name of the Mediator instance to retrieve
         * @return {mvc.pattern.mediator.Mediator}
         *  The Mediator instance previously registered with the given mediatorName
         */
        retrieveMediator:function( mediatorName ) {
            return this._mediatorMap[ mediatorName ];
        },

        /**
         * Remove a Mediator from the View.
         *
         * @param mediatorName {String}
         *  Name of the Mediator instance to be removed
         *  The Mediator that was removed from the View
         */
        removeMediator:function( mediatorName ) {
            // Retrieve the named mediator
            var mediator = this._mediatorMap[ mediatorName ];

            if ( mediator ) {
                // for every notification this mediator is interested in...
                var interests = mediator.listNotificationInterests();
                for ( var i = 0; i<interests.length; i++ ) {
                    // remove the observer linking the mediator
                    // to the notification interest
                    this.removeObserver( interests[i], mediator );
                }


                // remove the mediator from the map
                this._mediatorMap[ mediatorName ].dispose();
                delete this._mediatorMap[ mediatorName ];

                // alert the mediator that it has been removed
                mediator.dispose();
            }
        }
    },

    destruct: function () {
        for (var name in this._mediatorMap) {
            this._mediatorMap[name].dispose();
            this._mediatorMap[name] = null;
            delete this._mediatorMap[name];
        }

        for (var name in this._observerMap) {
            this._observerMap[name].forEach(function(item, index, array) {
                item.dispose();
            });

            delete this._observerMap[name];
        }
    }
});