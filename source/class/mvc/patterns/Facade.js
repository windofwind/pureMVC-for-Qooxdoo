/**
 * A base Singleton <code>IFacade</code> implementation.
 *
 * <P>
 * In PureMVC, the <code>Facade</code> class assumes these
 * responsibilities:</P>
 * <UL>
 * <LI>Initializing the <code>Model</code>, <code>View</code>
 * and <code>Controller</code> Singletons.</LI>
 * <LI>Providing all the methods defined by the <code>IModel,
 * IView, and IController</code> interfaces.</LI>
 * <LI>Providing the ability to override the specific <code>Model</code>,
 * <code>View</code> and <code>Controller</code> Singletons created.</LI>
 * <LI>Providing a single point of contact to the application for
 * registering <code>Commands</code> and notifying <code>Observers</code></LI>
 * </UL>
 * <P>
 * Example usage:</P>
 * <listing>
 *	import org.puremvc.as3.patterns.facade.Facade;
 *
 *	import com.me.myapp.model.~~;
 *	import com.me.myapp.view.~~;
 *	import com.me.myapp.controller.~~;
 *
 *	public class MyFacade extends Facade
 *	{
 *		// Notification constants. The Facade is the ideal
 *		// location for these constants, since any part
 *		// of the application participating in PureMVC
 *		// Observer Notification will know the Facade.
 *		public static const GO_COMMAND:String = "go";
 *
 *		// Override Singleton Factory method
 *		public static function getInstance() : MyFacade {
 *			if (instance == null) instance = new MyFacade();
 *			return instance as MyFacade;
 *		}
 *
 *		// optional initialization hook for Facade
 *		override public function initializeFacade() : void {
 *			super.initializeFacade();
 *			// do any special subclass initialization here
 *		}
 *
 *		// optional initialization hook for Controller
 *		override public function initializeController() : void {
 *			// call super to use the PureMVC Controller Singleton.
 *			super.initializeController();
 *
 *			// Otherwise, if you're implmenting your own
 *			// IController, then instead do:
 *			// if ( controller != null ) return;
 *			// controller = MyAppController.getInstance();
 *
 *			// do any special subclass initialization here
 *			// such as registering Commands
 *			registerCommand( GO_COMMAND, com.me.myapp.controller.GoCommand )
 *		}
 *
 *		// optional initialization hook for Model
 *		override public function initializeModel() : void {
 *			// call super to use the PureMVC Model Singleton.
 *			super.initializeModel();
 *
 *			// Otherwise, if you're implmenting your own
 *			// IModel, then instead do:
 *			// if ( model != null ) return;
 *			// model = MyAppModel.getInstance();
 *
 *			// do any special subclass initialization here
 *			// such as creating and registering Model proxys
 *			// that don't require a facade reference at
 *			// construction time, such as fixed type lists
 *			// that never need to send Notifications.
 *			regsiterProxy( new USStateNamesProxy() );
 *
 *			// CAREFUL: Can't reference Facade instance in constructor
 *			// of new Proxys from here, since this step is part of
 *			// Facade construction!  Usually, Proxys needing to send
 *			// notifications are registered elsewhere in the app
 *			// for this reason.
 *		}
 *
 *		// optional initialization hook for View
 *		override public function initializeView() : void {
 *			// call super to use the PureMVC View Singleton.
 *			super.initializeView();
 *
 *			// Otherwise, if you're implmenting your own
 *			// IView, then instead do:
 *			// if ( view != null ) return;
 *			// view = MyAppView.getInstance();
 *
 *			// do any special subclass initialization here
 *			// such as creating and registering Mediators
 *			// that do not need a Facade reference at construction
 *			// time.
 *			registerMediator( new LoginMediator() );
 *
 *			// CAREFUL: Can't reference Facade instance in constructor
 *			// of new Mediators from here, since this is a step
 *			// in Facade construction! Usually, all Mediators need
 *			// receive notifications, and are registered elsewhere in
 *			// the app for this reason.
 *		}
 *	}
 * </listing>
 *
 * @see mvc.core.model.Model Model
 * @see mvc.core.view.View View
 * @see mvc.core.controller.Controller Controller
 * @see mvc.patterns.observer.Notification Notification
 * @see mvc.patterns.Mediator Mediator
 * @see mvc.patterns.Proxy Proxy
 * @see mvc.patterns.command.SimpleCommand SimpleCommand
 * @see mvc.patterns.command.MacroCommand MacroCommand
 */
qx.Class.define("mvc.patterns.Facade", {
    extend: qx.core.Object,
    implement : mvc.interfaces.IFacade,

    /*
     *****************************************************************************
     STATICS
     *****************************************************************************
     */
    statics: {
        _instance:null,
        getInstance:function() {
        }
    },

    /*
     *****************************************************************************
     CONSTRUCTOR
     *****************************************************************************
     */

    /**
     * Constructor.
     *
     * <P>
     * This <code>IFacade</code> implementation is a Singleton,
     * so you should not call the constructor
     * directly, but instead call the static Singleton
     * Factory method <code>Facade.getInstance()</code></P>
     *
     */
    construct: function () {
        this.base(arguments);
        this.self(arguments)._instance = this;
        this._initializeFacade();
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
        /**
         *  Private references to Model, View and Controller
         */
        _controller:null,
        _model:null,
        _view:null,

        /**
         * Initialize the Singleton <code>Facade</code> instance.
         *
         * <P>
         * Called automatically by the constructor. Override in your
         * subclass to do any subclass specific initializations. Be
         * sure to call <code>super.initializeFacade()</code>, though.</P>
         */
        _initializeFacade:function() {
            this._initializeModel();
            this._initializeController();
            this._initializeView();
        },

        /**
         * Initialize the <code>Controller</code>.
         *
         * <P>
         * Called by the <code>initializeFacade</code> method.
         * Override this method in your subclass of <code>Facade</code>
         * if one or both of the following are true:</P>
         * <UL>
         * <LI> You wish to initialize a different <code>IController</code>.</LI>
         * <LI> You have <code>Commands</code> to register with the <code>Controller</code> at startup. </LI>
         * </UL>
         * If you don't want to initialize a different <code>IController</code>,
         * call <code>super.initializeController()</code> at the beginning of your
         * method, then register <code>Command</code>s.
         */
        _initializeController:function( ) {
            if ( this._controller != null ) {
                return;
            }

            this._controller = mvc.core.Controller.getInstance();
        },

        /**
         * Initialize the <code>Model</code>.
         *
         * <P>
         * Called by the <code>initializeFacade</code> method.
         * Override this method in your subclass of <code>Facade</code>
         * if one or both of the following are true: </P>
         * <UL>
         * <LI> You wish to initialize a different <code>IModel</code>.</LI>
         * <LI> You have <code>Proxy</code>s to register with the Model that do not
         * retrieve a reference to the Facade at construction time.</LI>
         * </UL>
         * If you don't want to initialize a different <code>IModel</code>,
         * call <code>super.initializeModel()</code> at the beginning of your
         * method, then register <code>Proxy</code>s.
         * <P>
         * Note: This method is <i>rarely</i> overridden; in practice you are more
         * likely to use a <code>Command</code> to create and register <code>Proxy</code>s
         * with the <code>Model</code>, since <code>Proxy</code>s with mutable data will likely
         * need to send <code>INotification</code>s and thus will likely want to fetch a reference to
         * the <code>Facade</code> during their construction.
         * </P>
         */
        _initializeModel:function() {
            if ( this._model != null ) {
                return;
            }

            this._model = mvc.core.Model.getInstance();
        },

        /**
         * Initialize the <code>View</code>.
         *
         * <P>
         * Called by the <code>initializeFacade</code> method.
         * Override this method in your subclass of <code>Facade</code>
         * if one or both of the following are true:</P>
         * <UL>
         * <LI> You wish to initialize a different <code>IView</code>.</LI>
         * <LI> You have <code>Observers</code> to register with the <code>View</code></LI>
         * </UL>
         * If you don't want to initialize a different <code>IView</code>,
         * call <code>super.initializeView()</code> at the beginning of your
         * method, then register <code>IMediator</code> instances.
         * <P>
         * Note: This method is <i>rarely</i> overridden; in practice you are more
         * likely to use a <code>Command</code> to create and register <code>Mediator</code>s
         * with the <code>View</code>, since <code>IMediator</code> instances will need to send
         * <code>INotification</code>s and thus will likely want to fetch a reference
         * to the <code>Facade</code> during their construction.
         * </P>
         */
        _initializeView:function( ) {
            if ( this._view != null ) {
                return;
            }
            
            this._view = mvc.core.View.getInstance();
        },

        /**
         * Register an <code>ICommand</code> with the <code>Controller</code> by Notification name.
         *
         * @param notificationName {String} the name of the <code>INotification</code> to associate the <code>ICommand</code> with
         * @param commandClassRef {Class} a reference to the Class of the <code>ICommand</code>
         */
        registerCommand:function( notificationName, commandClassRef) {
            this._controller.registerCommand( notificationName, commandClassRef );
        },

        /**
         * Remove a previously registered <code>ICommand</code> to <code>INotification</code> mapping from the Controller.
         *
         * @param notificationName {String} the name of the <code>INotification</code> to remove the <code>ICommand</code> mapping for
         */
        removeCommand:function( notificationName ) {
            this._controller.removeCommand( notificationName );
        },

        /**
         * Check if a Command is registered for a given Notification
         *
         * @param notificationName {String}
         * @return {Boolean} whether a Command is currently registered for the given <code>notificationName</code>.
         */
        hasCommand:function( notificationName ) {
            return this._controller.hasCommand(notificationName);
        },

        /**
         * Register an <code>IProxy</code> with the <code>Model</code> by name.
         *
         * @param proxy {mvc.interfaces.IProxy} the <code>IProxy</code> instance to be registered with the <code>Model</code>.
         */
        registerProxy:function( proxy ) {
            this._model.registerProxy( proxy );
        },

        /**
         * Retrieve a Proxy from the Model
         *
         * @param proxyName {String} the name of the proxy to be retrieved.
         * @return {mvc.interfaces.IProxy} the <code>IProxy</code> instance previously registered with the given <code>proxyName</code>.
         */
        retrieveProxy:function( proxyName ) {
            return this._model.retrieveProxy( proxyName );
        },

        /**
         * Remove an <code>IProxy</code> from the <code>Model</code> by name.
         *
         * @param proxyName {String} the <code>IProxy</code> to remove from the <code>Model</code>.
         * @return {mvc.interfaces.IProxy} the <code>IProxy</code> that was removed from the <code>Model</code>
         */
        removeProxy:function( proxyName ) {
            var proxy;

            if(this._model != null) {
                proxy = this._model.removeProxy(proxyName);
            }

            return proxy;
        },

        /**
         * Check if a Proxy is registered
         *
         * @param proxyName {String}
         * @return {Boolean} whether a Proxy is currently registered with the given <code>proxyName</code>.
         */
        hasProxy:function( proxyName ) {
            return this._model.hasProxy(proxyName);
        },

        /**
         * Register a <code>IMediator</code> with the <code>View</code>.
         *
         * @param mediator {mvc.interfaces.IMediator} a reference to the <code>IMediator</code>
         */
        registerMediator:function( mediator ) {
            if(this._view != null) {
                this._view.registerMediator(mediator);
            }
        },

        /**
         * Retrieve an <code>IMediator</code> from the <code>View</code>.
         *
         * @param mediatorName {String}
         * @return {mvc.interfaces.IMediator} the <code>IMediator</code> previously registered with the given <code>mediatorName</code>.
         */
        retrieveMediator:function( mediatorName ) {
            return this._view.retrieveMediator(mediatorName);
        },

        /**
         * Remove an <code>IMediator</code> from the <code>View</code>.
         *
         * @param mediatorName {String} name of the <code>IMediator</code> to be removed.
         * @return {mvc.interfaces.IMediator} the <code>IMediator</code> that was removed from the <code>View</code>
         */
        removeMediator:function ( mediatorName ) {
            var mediator;

            if(this._view != null) {
                mediator = this._view.removeMediator(mediatorName);
            }

            return mediator;
        },

        /**
         * Check if a Mediator is registered or not
         *
         * @param mediatorName {String}
         * @return {Boolean} whether a Mediator is registered with the given <code>mediatorName</code>.
         */
        hasMediator:function( mediatorName ) {
            return this._view.hasMediator(mediatorName);
        },

        /**
         * Create and send an <code>INotification</code>.
         *
         * <P>
         * Keeps us from having to construct new notification
         * instances in our implementation code. </P>
         * @param notificationName {String} the name of the notiification to send
         * @param body {Object} the body of the notification (optional)
         * @param type {String} the type of the notification (optional)
         */

        sendNotification:function( notificationName, body, type) {
            var note = new mvc.patterns.observer.Notification(notificationName, body, type);
            this.__notifyObservers(note);
            note.dispose();
        },

        /**
         * Notify <code>Observer</code>.
         * <P>
         * This method is left public mostly for backward
         * compatibility, and to allow you to send custom
         * notification classes using the facade.</P>
         * <P>
         * Usually you should just call sendNotification
         * and pass the parameters, never having to
         * construct the notification yourself.</P>
         *
         * @param notification {mvc.interfaces.INotification} the <code>INotification</code> to have the <code>View</code> notify <code>Observers</code> of.
         */
        __notifyObservers:function( notification ) {
            if(this._view != null) {
                this._view.notifyObservers(notification);
            }
        }
    },

    destruct: function () {
        mvc.core.Controller.removeInstance();
        mvc.core.Model.removeInstance();
        mvc.core.View.removeInstance();
    }
});